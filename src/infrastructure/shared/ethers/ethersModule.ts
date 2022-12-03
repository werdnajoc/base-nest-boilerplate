import { Module } from '@nestjs/common';
import { EthersService } from 'infrastructure/shared/ethers/ethers.service';

@Module({
  providers: [EthersService],
})
export class EthersModule {}
