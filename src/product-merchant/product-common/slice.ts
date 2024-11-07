import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { ICommonSliceProps } from './interface';

const initialState: ICommonSliceProps = {
  selectVariantId: [],
};

export const commonReducer = createSlice({
  name: 'commonProduct',
  initialState,
  reducers: {
    setSelectVariantId(state, action: PayloadAction<number[]>) {
      state.selectVariantId = action.payload;
    },
  },
});

export const { setSelectVariantId } = commonReducer.actions;

export const selectVariantIds = (state: RootState) => state.commonProduct.selectVariantId;

export default commonReducer.reducer;
