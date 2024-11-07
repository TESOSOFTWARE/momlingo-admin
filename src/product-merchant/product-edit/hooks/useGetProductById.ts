import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IDetailProduct, IProductCallback } from '../../product-common/interface';
import { getProductById } from '../edit-service';

export const useGetProductById = ({
  id,
  callback,
}: {
  id: number;
  callback: IProductCallback;
}) =>
  useQuery([QUERY_KEYS.GET_PRODUCT_BY_ID, id], () => getProductById(id), {
    select: (data: IDetailProduct) => {
      return {
        id: data.id,
        status: data.status,
        type: data.type,
        isFeatured: data.isFeatured,
        taxStatus: data.taxStatus,
        onSale: data.onSale,
        thumbnail: data.thumbnail,
        name: data.productDetails[0].name,
        description: data.productDetails[0].description,
        shortDescription: data.productDetails[0].shortDescription,
        slug: data.productDetails[0].slug,
        lang: data.productDetails[0].lang,
        productCategories: data.productCategories,
        productCategoriesName: data?.productCategories?.map((item) => {
          return item?.categoryDetails[0]?.name;
        }),
        productTags: data.productTags,
        productTagsName: data.productTags.map((item) => {
          return item.name;
        }),
        productVariants: data.productVariants,
        totalImages: [
          data.thumbnail.url,
          ...data.productVariants.map((item) => item.images[0].url),
        ],
      };
    },
  });
