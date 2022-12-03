import { ethers, providers, Wallet } from 'ethers';

export interface IContract {
  address: string;
}

export default class Contract implements IContract {
  provider: providers.JsonRpcProvider;

  signer: Wallet;

  address: string;

  constructor(address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.BACKEND_WALLET_PRIVATE_KEY);
    this.signer = wallet.connect(this.provider);
    this.address = address;
  }

  getInstance(
    abi: any,
    address: string,
    signer: ethers.Signer,
  ): ethers.Contract {
    return new ethers.Contract(address, abi, signer);
  }
}
