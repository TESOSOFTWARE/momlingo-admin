import { CustomFile } from '../../common/components/upload';
import { Variant } from '../product-common/components/VariantTable/interface';
import { ProductStatus, ProductType, TaxStatus } from '../product-common/interface';
import { IProductDetail } from './../product-common/interface';

export interface IEditProduct {
  type: ProductType;
  status: ProductStatus;
  isFeatured: boolean;
  onSale: boolean;
  thumbnailId: number;
  productDetails: [
    {
      lang: string;
      name: string;
      description: string;
      shortDescription: string;
      slug: string;
    }
  ];
  taxStatus: TaxStatus;
  tagIds: number[];
  categoryIds: number[];
  productVariantIds: number[];
  id: number;
  defaultProductVariantId: number;
}

export interface ITagsType {
  value: number;
  label: string;
}

export interface IConvertProduct {
  id: number;
  status: ProductStatus;
  type: ProductType;
  isFeatured: boolean;
  taxStatus: TaxStatus;
  onSale: boolean;
  thumbnail: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  lang: string;
  productDetails: IProductDetail[];
  categories: {
    id: number;
    name: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  productVariants: Variant[];
  photoURL: CustomFile | string;
  productVariantId: number[];
  defaultProductVariantId: number;
}

export interface IVariant {
  id: number;
  price: number;
  quantity: number;
  salePrice: number;
  sku: string;
  productAttributeTermIds: number[];
  images: {
    url: string;
    id: number;
  }[];
  productToVariantId: number;
  productAttributes: {
    productAttributeId: number;
    productAttributeTermId: number;
  }[];
}
export interface IEditSliceProps {
  productVariant: IVariant[];
  isPopupVariant: boolean;
  variantId: number[];
  isChecked: boolean;
  variantIdBefore: number[];
  variantIdOld: number[];
  defaultVariantId: number;
  isReset: number;
  isNotice: boolean;
  isLinkedWithExternal: boolean;
}
