import {
  ProductLang,
  ProductStatus,
  ProductType,
  TaxStatus,
} from '../product-common/interface';
import { IVariant } from './edit-interface';

export const defaultValuesEditProduct = {
  type: ProductType.simple,
  status: ProductStatus.banned,
  isFeatured: false,
  taxStatus: TaxStatus.none,
  onSale: false,
  thumbnail: '',
  name: '',
  description: '',
  shortDescription: '',
  slug: '',
  lang: ProductLang.vn,
  photoURL: '',
};
export const defaultValueVariant: IVariant[] = [
  {
    id: 1,
    price: 25.99,
    quantity: 10,
    salePrice: 21.99,
    sku: '',
    productAttributeTermIds: [0],
    images: [
      {
        url: '',
        id: 1,
      },
    ],
    productToVariantId: 1,
    productAttributes: [
      {
        productAttributeId: 1,
        productAttributeTermId: 1,
      },
    ],
  },
];

export const langProduct = [
  { key: 'Vietnamese', value: 'VN' },
  { key: 'English', value: 'EN' },
];

export const statusProduct = [
  { key: 'Active', value: 'ACTIVE' },
  { key: 'In Active', value: 'IN_ACTIVE' },
];

export const typeProduct = [
  { label: 'Simple', value: 'SIMPLE' },
  { label: 'Configurable', value: 'CONFIGURABLE' },
];

export const taxProduct = [
  { label: 'Taxable', value: 'TAXABLE' },
  { label: 'None', value: 'NONE' },
];
