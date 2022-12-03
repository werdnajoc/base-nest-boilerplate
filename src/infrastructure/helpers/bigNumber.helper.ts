import { BigNumber, ethers } from 'ethers';

export const prettyBaseTokenValue = (value: BigNumber): string => {
  const stringEtherValue = prettyTokenValue(value, 18);
  return (+stringEtherValue).toFixed(4);
};

export const prettyTokenValue = (
  value: BigNumber,
  decimals: number,
): number => {
  return +ethers.utils.formatUnits(value, decimals);
};

export const prettyOtherTokenValue = (
  value: BigNumber,
  decimals = 18,
): string => {
  const stringEtherValue = prettyTokenValue(value, decimals);
  return (+stringEtherValue).toFixed(6);
};
