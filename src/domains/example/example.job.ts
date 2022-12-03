import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { ExampleService } from './example.service';
import { ExampleEventEmitter } from './example.eventEmitter';

@Injectable()
export class ExampleJob {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private exampleService: ExampleService,
    private exampleEventEmitter: ExampleEventEmitter,
  ) {}

  @Interval(15000)
  async jobTest() {
    this.logger.debug('Starting jobTest');
    await this.exampleService.test();
  }

  @Interval(5000)
  async jobTestCallEvent() {
    this.logger.debug('Starting jobTestCallEvent Job');
    await this.exampleEventEmitter.emiterEventExampe({
      success: true,
    });
  }
}
