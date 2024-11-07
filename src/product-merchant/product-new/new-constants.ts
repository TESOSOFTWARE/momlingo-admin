import {
  EnumVoucher,
  IListVariant,
  ProductLang,
  ProductStatus,
  ProductType,
} from '../product-common/interface';

export const defaultValuesNewProduct = {
  type: ProductType.simple,
  status: ProductStatus.active,
  isFeatured: false,
  taxStatus: false,
  name: '',
  description: '',
  shortDescription: '',
  lang: ProductLang.vn,
  slug: '',
  onSale: false,
};

export const typeProduct = [
  { label: 'Một biến thể', value: 'SIMPLE' },
  { label: 'Nhiều biến thể', value: 'CONFIGURABLE' },
  { label: 'Voucher', value: 'VIRTUAL' },
];

export const langProduct = [
  { key: 'Vietnamese', value: 'VN' },
  { key: 'English', value: 'EN' },
];

export const statusProduct = [
  { key: 'Active', value: 'ACTIVE' },
  { key: 'In Active', value: 'IN_ACTIVE' },
];

export const defaultValueVariant: IListVariant = {
  items: [
    {
      id: 0,
      price: 0,
      quantity: 0,
      salePrice: 0,
      name: '',
      sku: '',
      images: [
        {
          id: 0,
          key: '',
          type: '',
          size: 0,
          url: '',
        },
      ],
      productAttributeTerms: [
        {
          id: 0,
          productAttributeId: 0,
          productAttributeTermDetails: [
            {
              id: 0,
              lang: '',
              value: '',
            },
          ],
          productAttribute: {
            id: 0,
            type: '',
            hasArchives: false,
            productAttributeDetails: [
              {
                id: 0,
                lang: '',
                name: '',
                description: '',
                slug: '',
              },
            ],
          },
        },
      ],
      externalProduct: {
        id: 0,
        type: EnumVoucher.UNKNOWN,
        externalIdentifier: '',
        productInfo: {
          title: '',
          thumbnail: '',
          condition: '',
        },
        externalProductProvider: {
          id: 0,
          key: 'UR_BOX',
          name: '',
          desc: '',
        },
      },
      productVariantPoint: {
        id: 0,
        point: 0,
        salePoint: 0,
        productVariant: '',
      },
    },
  ],
  meta: {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
  },
};
