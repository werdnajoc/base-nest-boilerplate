import { Module } from '@nestjs/common';
import { PancakeSwapService } from 'infrastructure/shared/pancakeSwap/pancakeSwap.service';
import { EthersModule } from 'infrastructure/shared/ethers/ethersModule';

@Module({
  controllers: [],
  exports: [PancakeSwapService],
  providers: [PancakeSwapService],
  imports: [EthersModule],
})
export class PancakeSwapModule {}
