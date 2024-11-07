import { ITypeSection } from '../interface';
import { v4 as uuidv4 } from 'uuid';

export const getInfomationOfSection = (typeSection: string) => {
  switch (typeSection) {
    case ITypeSection.HORIZONTAL_PRODUCT_LIST_1:
      return {
        id: uuidv4(),
        title: '',
        type: ITypeSection.HORIZONTAL_PRODUCT_LIST_1,
        data: {
          maxLength: 0,
          categoryId: 0,
        },
      };
    case ITypeSection.HORIZONTAL_PRODUCT_LIST_2:
      return {
        id: uuidv4(),
        title: '',
        type: ITypeSection.HORIZONTAL_PRODUCT_LIST_2,
        data: {
          maxLength: 0,
          categoryId: 0,
        },
      };
    case ITypeSection.BANNER:
      return {
        id: uuidv4(),
        type: ITypeSection.BANNER,
        data: [],
      };
    case ITypeSection.NORMAL_SERVICE:
      return {
        id: uuidv4(),
        type: ITypeSection.NORMAL_SERVICE,
        data: [],
        title: '',
      };
  }
};
