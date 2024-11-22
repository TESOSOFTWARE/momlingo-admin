import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IAddress, IAddressItem, InitialOrderState } from './interface';
import { DEFAULT_ADDRESS } from './constant';

const initialOrderState: InitialOrderState = {
  provinceId: 0,
  isOpenModalEditAddress: false,
  pickAddress: {
    ...DEFAULT_ADDRESS,
    // province: 0,
    // district: 0,
    // address1: '',
    // ward: 0,
  },
};

export const editOrderReducer = createSlice({
  name: 'editOrder',
  initialState: initialOrderState,
  reducers: {
    setProvinceId(state, action: PayloadAction<number>) {
      state.provinceId = action.payload;
    },
    setIsOpenModalEditAddress(state, action: PayloadAction<boolean>) {
      state.isOpenModalEditAddress = action.payload;
    },
    setPickedAddress(state, action: PayloadAction<IAddress>) {
      state.pickAddress = action.payload;
    },
  },
});

export const { setProvinceId, setIsOpenModalEditAddress, setPickedAddress } =
  editOrderReducer.actions;

export const provinceId = (state: RootState) => state.editOrder.provinceId;
export const isOpenModalEditAddressSelector = (state: RootState) =>
  state.editOrder.isOpenModalEditAddress;
export const pickedAddressSelector = (state: RootState) => state.editOrder.pickAddress;

export default editOrderReducer.reducer;
