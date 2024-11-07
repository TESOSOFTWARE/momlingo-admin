import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IFields, IEventGiftItem } from './interface';
import { IGiftListResponse } from '../config-wheel-create/interface';

const initialState: IInitialState = {
  fields: [],
  isOpenWheelImageModal: false,
  giftList: [],
  status: '',
};

export const editWheelSlice = createSlice({
  name: 'edit-wheel',
  initialState,
  reducers: {
    handleRemoveRow: (state, action: PayloadAction<number>) => {
      state.fields = state.fields.filter((item) => item?.id !== action.payload);
    },
    handleAddNewrow: (state, action: PayloadAction<IFields>) => {
      state.fields.push(action.payload);
    },
    setIsOpenWheelImageModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWheelImageModal = action.payload;
    },
    setFields: (state, action: PayloadAction<IEventGiftItem[] | undefined>) => {
      // @ts-ignore
      state.fields = action.payload;
    },
    setGiftList: (state, action: PayloadAction<IGiftListResponse[]>) => {
      state.giftList = action.payload?.map((item: IGiftListResponse) => ({
        label: item?.name,
        value: item?.id,
      }));
    },
    getDefaultStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setRowValue: (state, action: PayloadAction<IFields>) => {
      state.fields.forEach((item) => {
        if (item?.id === action.payload?.id) {
          item.amount = action.payload.amount;
          item.winRate = action.payload.winRate;
          item.ordinal = action.payload.ordinal;
          item.giftId = action.payload.giftId;
        }
      });
    },
  },
});
export const {
  actions: {
    handleRemoveRow,
    handleAddNewrow,
    setIsOpenWheelImageModal,
    setFields,
    setGiftList,
    getDefaultStatus,
    setStatus,
    setRowValue,
  },
  reducer,
} = editWheelSlice;
