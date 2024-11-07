import { defaultValueSearch } from './constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IListSlice, IDeletePoint, IDataSearch } from './interface';
const initialState: IListSlice = {
  filterCode: defaultValueSearch,
  isPopupDel: false,
  delPoint: { ids: [0] },
};

export const pointListSlice = createSlice({
  name: 'pointList',
  initialState,
  reducers: {
    setPointFilter: (state, action: PayloadAction<IDataSearch>) => {
      state.filterCode = action.payload;
    },
    setPopupDel: (state, action: PayloadAction<boolean>) => {
      state.isPopupDel = action.payload;
    },
    setDelPoint: (state, action: PayloadAction<IDeletePoint>) => {
      state.delPoint = action.payload;
    },
  },
});
export const { setPointFilter, setPopupDel, setDelPoint } = pointListSlice.actions;

export const filtersCode = (state: RootState) => state.pointList.filterCode;
export const showPopupDel = (state: RootState) => state.pointList.isPopupDel;
export const deletePoint = (state: RootState) => state.pointList.delPoint;

export default pointListSlice.reducer;
