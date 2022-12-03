import { Injectable } from '@nestjs/common';
import { ethers, Signer } from 'ethers';

import { CreateRandomWalletReturn } from 'infrastructure/shared/ethers/Interfaces';

import { ERC20Contract } from 'infrastructure/shared/ethers/contracts/ERC20Contract';
import { PancakeSwapRouterContract } from 'infrastructure/shared/ethers/contracts/PancakeSwapRouterContract';

@Injectable()
export class EthersService {
  provider: ethers.providers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  }

  async createRandomWallet(): Promise<CreateRandomWalletReturn> {
    return {
      address: ethers.Wallet.createRandom().address,
      privateKey: ethers.Wallet.createRandom().privateKey,
      phrase: ethers.Wallet.createRandom().mnemonic.phrase,
    };
  }

  async getSignerInstance(privateKey: string): Promise<Signer> {
    const wallet = new ethers.Wallet(privateKey);
    return wallet.connect(this.provider);
  }

  async getAdminSignerInstance(): Promise<Signer> {
    return this.getSignerInstance(process.env.BACKEND_WALLET_PRIVATE_KEY);
  }

  async getERC20ContractInstance(
    address: string,
    signer?: ethers.Signer,
  ): Promise<ERC20Contract> {
    return new ERC20Contract(address, signer);
  }

  async getPancakeSwapRouterInstance(
    address: string,
    signer?: ethers.Signer,
  ): Promise<PancakeSwapRouterContract> {
    return new PancakeSwapRouterContract(address, signer);
  }
}
