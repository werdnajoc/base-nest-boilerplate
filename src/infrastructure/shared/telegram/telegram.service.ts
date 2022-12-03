import { Injectable } from '@nestjs/common';
import TelegramBotApi from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'commons/configuration';

@Injectable()
export class TelegramService {
  constructor(private readonly config: ConfigService<Configuration>) {}

  async getBotInstance(params?: {
    polling?: boolean;
  }): Promise<TelegramBotApi> {
    return new TelegramBotApi(this.config.get('TELEGRAM_API_KEY'), params);
  }

  async sendMessage(params: { id: string; message: string }): Promise<void> {
    const bot = await this.getBotInstance({
      polling: false,
    });

    await bot.sendMessage(params.id, params.message);
  }

  async sendMessageToGroupLogs(params: {
    message: string;
    replyMarkup?: string;
  }): Promise<string> {
    const bot = await this.getBotInstance({
      polling: false,
    });

    const message = await bot.sendMessage(
      this.config.get('TELEGRAM_GROUP_ID'),
      params.message,
      { parse_mode: 'Markdown', reply_markup: params.replyMarkup },
    );

    return message.message_id;
  }

  async updateMessageToGroupLogs(params: {
    message: string;
    messageId: string;
    chatId: string;
    replyMarkup?: string;
  }): Promise<string> {
    const bot = await this.getBotInstance({
      polling: false,
    });

    try {
      const message = await bot.editMessageText(params.message, {
        message_id: params.messageId,
        chat_id: params.chatId,
        parse_mode: 'Markdown',
        reply_markup: params.replyMarkup,
      });
      return message.message_id;
    } catch (error) {
      console.error(error);
    } finally {
      return params.messageId;
    }
  }

  async updateMessageReplyMarkup(params: {
    chatId: string;
    replyMarkup: string;
    messageId: string;
  }): Promise<string> {
    const bot = await this.getBotInstance({
      polling: false,
    });
    try {
      await bot.editMessageReplyMarkup(params.replyMarkup, {
        chat_id: params.chatId,
        message_id: params.messageId,
      });
    } finally {
      return params.messageId;
    }
  }

  async deleteMessageToGroupLogs(params: { messageId: string }): Promise<void> {
    const bot = await this.getBotInstance({
      polling: false,
    });

    await bot.deleteMessage(
      this.config.get('TELEGRAM_GROUP_ID'),
      params.messageId,
    );
  }
}
