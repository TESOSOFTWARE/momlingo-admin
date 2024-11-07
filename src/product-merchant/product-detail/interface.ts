import { ProductStatus, ProductType, TaxStatus } from './../product-common/interface';

export interface IDetailProduct {
  id: number;
  status: ProductStatus;
  type: ProductType;
  isFeatured: boolean;
  taxStatus: TaxStatus;
  onSale: boolean;
  thumbnail: Image;
  productDetails: IProductDetail[];
  productCategories: IProductCategory[];
  productTags: IProductTag[];
  productVariants: IProductVariant[];
}

export interface Image {
  id: number;
  key: string;
  type: string;
  size: number;
  url: string;
}

export interface IProductDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
}

export interface IProductCategory {
  id: number;
  categoryDetails: [
    {
      lang: string;
      desc: string;
      name: string;
      slug: string;
    }
  ];
}

export interface IProductTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface IProductVariant {
  id: number;
  price: number;
  quantity: number;
  salePrice: number;
  sku: string;
  images: Image[];
  productAttributeTerms: IProductAttributeTerm[];
}

export interface IProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  productAttribute: IProductAttribute;
}

export interface IProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

export interface IProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetail[];
}

export interface IProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  slug: string;
}

export interface CarouselProps {
  totalImages: string[];
}

export interface DetailPropsSlice {
  attributeTermButton: string | null;
  idVariant: number;
  showDataVariant: boolean;
  pressToggle: boolean;
}

export interface IConvertDataDetail {
  id: number;
  status: ProductStatus;
  type: ProductType;
  isFeatured: boolean;
  taxStatus: TaxStatus;
  onSale: boolean;
  thumbnail: Image;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  lang: string;
  productCategoriesName: string[];
  productTagsName: string[];
  productVariants: IProductVariant[];
  totalImages: string[];
}
