import { ethers } from 'ethers';

export const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  try {
    return new ethers.Contract(address, abi, signer);
  } catch (error) {
    return null;
  }
};
