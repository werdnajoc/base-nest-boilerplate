import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EVENTS } from './example.constant';

@Injectable()
export class ExampleEventEmitter {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emiterEventExampe(params: { success: boolean }) {
    this.eventEmitter.emit(EVENTS.testEvent, params);
  }
}
