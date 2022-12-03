export const compareTwoAddress = ({
  address1,
  address2,
}: {
  address1: string;
  address2: string;
}): boolean => {
  if (!address1 || !address2) return false;

  return address1.toLowerCase() === address2.toLowerCase();
};
