import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EVENTS } from './example.constant';

@Injectable()
export class ExampleEventReceiver {
  private readonly logger = new Logger(this.constructor.name);

  @OnEvent(EVENTS.testEvent)
  async eventExample(params: { success: boolean }) {
    this.logger.debug('{OnEvent} eventTest -> params: ', params);
  }
}
