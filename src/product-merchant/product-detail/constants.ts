import {
  ProductLang,
  ProductStatus,
  ProductType,
  TaxStatus,
} from '../product-common/interface';
export const defaultValueProduct = {
  id: 0,
  isFeatured: false,
  status: ProductStatus.banned,
  taxStatus: TaxStatus.none,
  type: ProductType.simple,
  idThumbnail: 0,
  key: '',
  url: '',
  typeThumbnail: '',
  size: 0,
  uploaderId: 0,
  lang: ProductLang.en,
  description: '',
  name: '',
  shortDescription: '',
  slug: '',
  productVariants: [],
};
