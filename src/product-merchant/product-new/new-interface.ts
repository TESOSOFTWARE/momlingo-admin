import { CustomFile } from '../../common/components/upload';
import { Variant } from '../product-common/components/VariantTable/interface';
import { ProductLang, ProductStatus, ProductType } from '../product-common/interface';

export interface IUploadFile {
  path: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModifiedDate: string;
}

export interface INewProduct {
  type: ProductType;
  status: ProductStatus;
  isFeatured: boolean;
  onSale: boolean;
  thumbnailId: number;
  productDetails: [
    {
      lang: ProductLang;
      name: string;
      description: string;
      shortDescription: string;
      slug: string;
    }
  ];
  taxStatus: string;
  tagIds: number[];
  categoryIds: number[];
  productVariantIds: number[];
  defaultProductVariantId: number;
}

export interface ISubmitData {
  type: ProductType;
  status: ProductStatus;
  isFeatured: boolean;
  taxStatus: boolean;
  tagIds: [{ id: number; name: string }];
  categoryIds: [{ id: number; name: string }];
  name: string;
  description: string;
  shortDescription: string;
  lang: ProductLang;
  slug: string;
  onSale: boolean;
  thumbnailId: number;
  photoURL: CustomFile | string;
  productVariantIds: number[];
  defaultProductVariantId: number;
  addForm?: string;
}

export interface IProductTag {
  items: [
    {
      id: number;
      name: string;
      slug: string;
      description: string;
      userId: number;
    }
  ];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IProductCategory {
  items: [
    {
      id: number;
      userId: number;
      categoryDetails: [
        {
          categoryId: number;
          lang: string;
          desc: string;
          name: string;
          slug: string;
        }
      ];
    }
  ];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface INewSliceProps {
  isPopupVariant: boolean;
  variantId: number[];
  variantIdBackup: number[];
  isChecked: boolean;
  isLinkedWithExternal?: boolean;
  defaultVariantId: number;
  isNotice: boolean;
  isReset: number;
  listVariantsSelect: Variant[];
}

export interface IParamsProductCartegory {
  page?: number;
  limit?: number;
}

export interface IParamsProductTag {
  page?: number;
  limit?: number;
}
