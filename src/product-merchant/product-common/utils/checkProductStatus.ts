import { ProductStatus, ProductType, TaxStatus } from '../interface';

export const checkProductStatus = (check: string) => {
  if (check === ProductStatus.active) {
    return true;
  }
  if (check === TaxStatus.taxable) {
    return true;
  }
  if (check === ProductType.simple) {
    return true;
  }
  return false;
};
