import { BigNumber, ethers } from 'ethers';
import { addressHelpers } from 'infrastructure/helpers';

import PancakeSwapRouterAbi from 'infrastructure/shared/ethers/contracts/abis/PancakeSwapRouter';
import Contract from 'infrastructure/shared/ethers/contracts/Contract';
import ERC20 from './abis/ERC20';

export interface ISwapExactTokensForTokensParams {
  amountIn: BigNumber;
  amountOutMin: BigNumber;
  path: string[];
  to: string;
  deadline: BigNumber;
}

export class PancakeSwapRouterContract extends Contract {
  contract: any;

  constructor(address: string, signer?: ethers.Signer) {
    super(address);
    this.contract = this.getInstance(
      PancakeSwapRouterAbi,
      address,
      signer || this.signer,
    );
  }

  async getAmountsOut(
    amountIn: BigNumber,
    path: string[],
  ): Promise<BigNumber[]> {
    return this.contract.getAmountsOut(amountIn, path).catch((error) => {
      console.log('getAmountsOut error: ', error);
      return [];
    });
  }

  async swapExactTokensForTokens(
    params: ISwapExactTokensForTokensParams,
  ): Promise<{
    transactionHash: string;
    amountIn: BigNumber;
    amountOut: BigNumber;
    gasPrice: BigNumber;
    gasUsed: BigNumber;
  }> {
    const tx = await this.contract.swapExactTokensForTokens(
      params.amountIn,
      params.amountOutMin,
      params.path,
      params.to,
      params.deadline,
    );

    const gasPrice = tx.gasPrice;

    const rc = await tx.wait();

    const erc20ABI = new ethers.utils.Interface(ERC20);

    const logFromReceivingToken = rc.logs
      //First we filter out only logs emmited by the Bougth token.
      .filter((log) =>
        addressHelpers.compareTwoAddress({
          address1: log.address,
          address2: params.path[params.path.length - 1],
        }),
      )
      //For each one we parse the hash in order to be able to read the data
      .map((log) => erc20ABI.parseLog(log))
      //We look out fot the Transfer event with the To param to our address.
      .find(
        (log) =>
          log.name === 'Transfer' &&
          addressHelpers.compareTwoAddress({
            address1: log.args['to'],
            address2: params.to,
          }),
      );

    const gasUsed = rc.gasUsed;

    return {
      transactionHash: tx.transactionHash,
      amountIn: params.amountIn,
      amountOut: logFromReceivingToken?.args['value'],
      gasPrice,
      gasUsed,
    };
  }
}
