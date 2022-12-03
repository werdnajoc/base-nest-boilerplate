import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleJob } from './example.job';
import { ExampleEventEmitter } from './example.eventEmitter';
import { ExampleEventReceiver } from './example.eventReceiver';

@Module({
  imports: [],
  providers: [
    ExampleService,
    ExampleJob,
    ExampleEventEmitter,
    ExampleEventReceiver,
  ],
  controllers: [ExampleController],
  exports: [ExampleService, ExampleEventEmitter],
})
export class ExampleModule {}
