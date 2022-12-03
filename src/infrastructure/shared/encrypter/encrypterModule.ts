import { Module } from '@nestjs/common';
import { ServiceEncryption } from './encrypter.service';

@Module({
  providers: [ServiceEncryption],
})
export class EncrypterModule {}
