import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Configuration } from 'commons/configuration';
import { EthersService } from 'infrastructure/shared/ethers/ethers.service';
import { BigNumber, ethers } from 'ethers';
import { SwapResult } from './types';

export interface ISwapParams {
  amountIn: BigNumber;
  path: string[];
  to: string;
}

@Injectable()
export class PancakeSwapService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly config: ConfigService<Configuration>,
    private ethersService: EthersService,
  ) {}

  async getAmountsOut(
    amountIn: BigNumber,
    path: string[],
  ): Promise<BigNumber[]> {
    const pancakeSwapContract =
      await this.ethersService.getPancakeSwapRouterInstance(
        this.config.get('PANCAKE_ROUTER_ADDRESS'),
      );

    return pancakeSwapContract.getAmountsOut(amountIn, path);
  }

  async swap(params: ISwapParams): Promise<SwapResult> {
    try {
      this.logger.log('init pancake swap: ', params.path.toString());

      const amounts = await this.getAmountsOut(params.amountIn, params.path);

      if (!amounts.length) throw new Error('Amount cannot be null.');

      const signerAdmin = await this.ethersService.getAdminSignerInstance();
      const pancakeSwapContract =
        await this.ethersService.getPancakeSwapRouterInstance(
          this.config.get('PANCAKE_ROUTER_ADDRESS'),
          signerAdmin,
        );

      const swapData = await pancakeSwapContract.swapExactTokensForTokens({
        ...params,
        amountOutMin: amounts[amounts.length - 1]
          .div(10000)
          .mul(10000 - this.config.get('DEFAULT_SLIPPAGE_SWAP')),
        // @TODO: calculate 2 min from current, just in case of node out of sync
        deadline: ethers.utils.parseUnits('9999999999', 'wei'),
      });

      return {
        transactionHash: swapData.transactionHash,
        boughtAmount: swapData.amountOut,
        soldAmount: BigNumber.from(params.amountIn),
        gasPrice: swapData.gasPrice,
        gasUsed: swapData.gasUsed,
      };
    } catch (error) {
      console.error('PancakeSwap.service error: ', error);
      this.logger.error(
        'init pancake swap error: ',
        error?.message ? error?.message : 'oops internal error',
      );
      throw error;
    }
  }

  async approveIfNedded(
    tokenContract: string,
    amount: BigNumber,
  ): Promise<void> {
    const contract = await this.ethersService.getERC20ContractInstance(
      tokenContract,
    );

    const currentAllowance = await contract.allowance(
      this.config.get('BACKEND_WALLET_ADDRESS'),
      this.config.get('PANCAKE_ROUTER_ADDRESS'),
    );

    if (amount.gt(currentAllowance)) {
      await contract.approve(
        this.config.get('PANCAKE_ROUTER_ADDRESS'),
        ethers.constants.MaxUint256,
      );
    }
  }
}
