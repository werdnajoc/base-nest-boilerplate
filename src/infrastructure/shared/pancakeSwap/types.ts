import { BigNumber } from 'ethers';

export type FeeReport = {
  buy_tax: number;
  sell_tax: number;
  buyGasUsed: string;
  sellGasUsed: string;
  error?: any;
};

export type HoneyPotReport = {
  status: string;
};

export type ContractVerified = {
  status: string;
  message: string;
  result: {
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    OptimizationUsed: string;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
  }[];
};

export type StaySafuReport = {
  error?: any;
  completed: number;
  rugScore: string;
  delayedHoneyScore: string;
  totalScore: string;
  tokenName: string;
  tokenSymbol: string;
  trade: {
    error: boolean;
    buyFee: number;
    sellFee: number;
    buyGas: string;
    sellGas: string;
    isHoneypot: boolean;
  };
  liquidity: {
    status: string;
    riskAmount: number;
    whaleHolder: {
      supplyHold: number;
      address: number;
    };
  };
  ownership: string;
  code: {
    verified: boolean;
    detectedScams: any[];
    isProxy: boolean;
  };
};

export type BuyFlashLoanData = {
  contract: string;
  feeReport: FeeReport;
  honeyPotReport: HoneyPotReport;
  contractVerified: ContractVerified;
  staySafuReport: StaySafuReport;
};

export type SwapResult = {
  transactionHash: string;
  soldAmount: BigNumber;
  boughtAmount: BigNumber;
  gasPrice: BigNumber;
  gasUsed: BigNumber;
};
