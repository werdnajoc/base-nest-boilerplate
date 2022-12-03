import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { ServiceEncryption } from './encrypter/encrypter.service';
import { EthersService } from './ethers/ethers.service';

@Global()
@Module({
  providers: [ConfigService, ServiceEncryption, EthersService],
  exports: [ConfigService, ServiceEncryption, EthersService],
  imports: [ConfigModule.forRoot()],
})
export class SharedModule {}
