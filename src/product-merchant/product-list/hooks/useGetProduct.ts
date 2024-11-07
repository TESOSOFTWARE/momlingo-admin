import { IProductTransform } from './../product-interface';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductList, IProductParams } from '../product-interface';
import { getProduct } from '../product-service';
import { max } from 'date-fns';

export function useGetProduct(params: IProductParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT, params], () => getProduct(params), {
      select: (data: IProductList): IProductTransform => {
        return {
          items: data?.items.map((item) => {
            return {
              id: item?.id,
              isFeatured: item?.isFeatured,
              status: item?.status,
              taxStatus: item?.taxStatus,
              type: item?.type,
              lang: item?.productDetails[0]?.lang,
              description: item?.productDetails[0]?.description,
              name: item?.productDetails[0]?.name,
              shortDescription: item?.productDetails[0]?.shortDescription,
              slug: item?.productDetails[0]?.slug,
              normalPrice: item?.priceRange?.normalPrice,
              salePrice: item?.priceRange?.salePrice,
              range: item?.priceRange?.range,
              thumbnailUrl: item?.thumbnail?.url,
              thumbnailId: item?.thumbnail?.id,
              thumbnailType: item?.thumbnail?.type,
              thumbnailSize: item?.thumbnail?.size,
              thumbnailKey: item?.thumbnail?.key,
            };
          }),
          totalItems: data?.meta.totalItems,
        };
      },
    }),
  };
}
