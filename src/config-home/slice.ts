import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { IDataRequest, IInitialState, ITypeSection } from './interface';
import { v4 as uuidv4 } from 'uuid';

const initialState: IInitialState = {
  numberAddNewSection: 0,
  numberSaveSection: 0,
  itemSectionBanner: {
    link: '',
    image: '',
    imageId: null,
  },
  dataSectionBanner: [],
  itemNormalServiceSection: {
    link: '',
    name: '',
    image: '',
    imageId: null,
    id: '',
  },
  titleForNormalService: '',
  dataNormalServiceSection: [],
  itemHorizontalProductList: {
    maxLength: null,
    categoryId: null,
  },
  itemVerticalProductList: {
    maxLength: null,
    categoryId: null,
  },
  titleForHorizontalProduct: '',
  titleForVerticalProduct: '',
  addSectionValue: '',
  sections: [],
  dataRequest: [],
  listLinkBanner: [],
  hasReplaceImage: false,
  indexOfImageToReplace: null,
  listLinkNormalService: [],
  nameNormalServiceList: [],
  isOpenPreviewSection: false,
};

const editHomeConfigurationSlice = createSlice({
  name: 'edit-home-configuration',
  initialState,
  reducers: {
    setNumberAddNewSection: (state, action: PayloadAction<number>) => {
      state.numberAddNewSection += action.payload;
    },
    setNumberSaveSection: (state, action: PayloadAction<number>) => {
      state.numberSaveSection += action.payload;
    },
    setItemSectionBanner: (state, action) => {
      state.itemSectionBanner.image = action.payload.image;
      state.itemSectionBanner.imageId = action.payload.imageId;
    },
    setLinkForBanner: (state, action) => {
      state.itemSectionBanner.link = action.payload;
      state.dataRequest.forEach((item) => {
        if (item.id === action.payload.id) {
          item.data.forEach((banner: any) => {
            banner.link = action.payload.link;
          });
        }
      });
      state.listLinkBanner.push(state.itemSectionBanner.link);
    },
    saveDataBannerSection: (state) => {
      state.dataSectionBanner.push(state.itemSectionBanner);
    },
    setItemNormalService: (state, action) => {
      state.itemNormalServiceSection.image = action.payload.image;
      state.itemNormalServiceSection.imageId = action.payload.imageId;
    },
    setTitleForNormalServiceSection: (state, action) => {
      state.titleForNormalService = action.payload;
    },
    setLinkForNormalService: (state, action) => {
      state.dataRequest.forEach((item) => {
        if (item.id === action.payload.id) {
          item.data.forEach((section: any) => {
            if (!section?.link?.length && !section?.name?.length) {
              section.link = action.payload.link;
              section.name = action.payload.name;
            }
          });
        }
      });
      state.listLinkNormalService.push(state.itemNormalServiceSection.link);
      state.nameNormalServiceList.push(action.payload.name);
    },
    saveDataNormalService: (state) => {
      state.dataNormalServiceSection.push(state.itemNormalServiceSection);
    },
    setItemProductList: (state, action) => {
      state.itemHorizontalProductList.maxLength = +action.payload.maxLength;
      state.itemHorizontalProductList.categoryId = +action.payload.categoryId;
    },
    setItemVerticalProductList: (state, action) => {
      state.itemVerticalProductList.maxLength = +action.payload.maxLength;
      state.itemVerticalProductList.categoryId = +action.payload.categoryId;
    },
    setTitleForHorizontalProduct: (state, action) => {
      state.titleForHorizontalProduct = action.payload;
    },
    setTitleForVerticalProduct: (state, action) => {
      state.titleForVerticalProduct = action.payload;
    },
    setAddSectionValue: (state, action: PayloadAction<string>) => {
      state.addSectionValue = action.payload;
    },
    setSections: (state, action: PayloadAction<IDataRequest>) => {
      state.dataRequest.push(action.payload);
    },
    updateSections: (state, action: PayloadAction<IDataRequest[]>) => {
      state.dataRequest = action.payload;
    },
    getSection: (state, action: PayloadAction<any>) => {
      state.sections = action.payload;
      const data = action.payload?.map((item: any) => {
        return {
          ...item,
          id: uuidv4(),
        };
      });
      state.dataRequest = data;
    },
    setDataRequest: (state, action) => {
      state.dataRequest.push(action.payload);
    },
    setIsOpenPreviewSection: (state, action: PayloadAction<boolean>) => {
      state.isOpenPreviewSection = action.payload;
    },
    // editDataRequest: (state, action) => {
    //   state.dataRequest?.forEach((item: any) => {
    //     if (item?.id === action.payload?.id) {
    //       if (action.payload?.type === ITypeSection.BANNER) {
    //         item.data = state.dataSectionBanner;
    //       }
    //       if (item?.type === ITypeSection.NORMAL_SERVICE) {
    //         item.data = state.dataNormalServiceSection;
    //         item.title = state.titleForNormalService;
    //       }
    //       if (item?.type === ITypeSection.HORIZONTAL_PRODUCT_LIST) {
    //         item.data = state?.itemHorizontalProductList;
    //         item.title = state.titleForHorizontalProduct;
    //       }
    //       if (item?.type === ITypeSection.GRID_PRODUCT_LIST) {
    //         item.data = state.itemVerticalProductList;
    //         item.title = state.titleForVerticalProduct;
    //       }
    //     }
    //   });
    // },
    resetScreenState: (state) => {
      state.dataRequest = initialState.dataRequest;
    },
    setHasReplaceImage: (state, action) => {
      state.hasReplaceImage = action.payload;
    },
    setIndexOfImageToReplace: (state, action) => {
      state.indexOfImageToReplace = action.payload;
    },
    editBannerImage: (state) => {
      state.dataSectionBanner.splice(
        state.indexOfImageToReplace,
        1,
        state.itemSectionBanner
      );
    },
    editNormalServiceImage: (state) => {
      state.dataNormalServiceSection?.splice(
        state.indexOfImageToReplace,
        1,
        state.itemNormalServiceSection
      );
    },
    addNewImage: (state, action) => {
      state.dataRequest = action.payload;
    },
    uploadNewImageBannerSection: (state, action) => {
      state.dataRequest.forEach((item: IDataRequest) => {
        if (item?.id === action.payload.id) {
          state.itemSectionBanner.imageId = action.payload.data.id;
          state.itemSectionBanner.image = action.payload.data.url;
          item.data.push(state.itemSectionBanner);
        }
      });
    },
    removeSectionItem: (state, action) => {
      state.dataRequest = state.dataRequest.filter(
        (section) => section.id !== action.payload
      );
    },
    uploadNewImageNormalService: (state, action) => {
      state.dataRequest.forEach((item) => {
        if (item?.id === action.payload.id) {
          state.itemNormalServiceSection.imageId = action.payload?.data?.id;
          state.itemNormalServiceSection.image = action.payload?.data?.url;
          state.itemNormalServiceSection.id = uuidv4();
          item.data.push(state.itemNormalServiceSection);
        }
      });
    },
    updateDataProductList: (state, action) => {
      state.dataRequest.forEach((item) => {});
    },
  },
});

export const {
  actions: {
    setNumberAddNewSection,
    setNumberSaveSection,
    setItemSectionBanner,
    setLinkForBanner,
    saveDataBannerSection,
    setItemNormalService,
    setLinkForNormalService,
    setTitleForNormalServiceSection,
    saveDataNormalService,
    setItemProductList,
    setItemVerticalProductList,
    setTitleForVerticalProduct,
    setTitleForHorizontalProduct,
    setAddSectionValue,
    setSections,
    setDataRequest,
    updateSections,
    // editDataRequest,
    resetScreenState,
    setHasReplaceImage,
    setIndexOfImageToReplace,
    editBannerImage,
    editNormalServiceImage,
    getSection,
    uploadNewImageBannerSection,
    removeSectionItem,
    uploadNewImageNormalService,
    setIsOpenPreviewSection,
  },
  reducer,
} = editHomeConfigurationSlice;
