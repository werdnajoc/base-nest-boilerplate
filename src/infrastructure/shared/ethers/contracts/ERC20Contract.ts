import { BigNumber, ethers } from 'ethers';

import ERC20Abi from 'infrastructure/shared/ethers/contracts/abis/ERC20';
import Contract from 'infrastructure/shared/ethers/contracts/Contract';

export class ERC20Contract extends Contract {
  contract: any;

  constructor(address: string, signer?: ethers.Signer) {
    super(address);
    this.contract = this.getInstance(ERC20Abi, address, signer || this.signer);
  }

  async balanceOf(address): Promise<BigNumber> {
    return this.contract.balanceOf(address);
  }

  async approve(spender: string, amount: BigNumber): Promise<void> {
    const txt = await this.contract.approve(spender, amount);
    await txt.wait();
  }

  async decimals(): Promise<number> {
    return this.contract.decimals();
  }

  async symbol(): Promise<string> {
    return this.contract.symbol();
  }

  async name(): Promise<string> {
    return this.contract.name();
  }

  async allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender);
  }

  async getInfo(): Promise<{ decimals: number; symbol: string; name: string }> {
    const decimals = await this.decimals();
    const symbol = await this.symbol();
    const name = await this.name();

    return {
      decimals,
      symbol,
      name,
    };
  }
}
