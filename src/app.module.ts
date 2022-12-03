import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

import { configuration } from 'commons/configuration';

import { AppService } from 'app.service';

import { SharedModule } from 'infrastructure/shared/shared.module';
import { ExampleModule } from 'domains/example/example.module';

import { HealthModule } from 'domains/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([]),
    HealthModule,
    SharedModule,
    ExampleModule,
  ],
  providers: [AppService],
})
export class AppModule {}
