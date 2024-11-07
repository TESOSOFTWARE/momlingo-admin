import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IDataExternal, IVariantSlice } from './interface';

const initialState: IVariantSlice = {
  listFormAtt: [''],
  page: 1,
  searchExternal: '',
  listTermIds: [],
  termNewId: 0
};
export const newVariantReducer = createSlice({
  name: 'newVariant',
  initialState,
  reducers: {
    setListForm: (state, action: PayloadAction<string[]>) => {
      state.listFormAtt = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchExternal: (state, action: PayloadAction<string>) => {
      state.searchExternal = action.payload;
    },
    setListTermIds: (state, action: PayloadAction<number[]>) => {
      state.listTermIds = action.payload;
    },
    setTermNewId: (state, action: PayloadAction<number>) => {
      state.termNewId = action.payload;
    }
  }
});

export const { setListForm, setPage, setSearchExternal, setListTermIds, setTermNewId } =
  newVariantReducer.actions;

export const listForm = (state: RootState) => state.newVariant.listFormAtt;
export const numberPage = (state: RootState) => state.newVariant.page;
export const searchExternal = (state: RootState) => state.newVariant.searchExternal;
export const listTermIds = (state: RootState) => state.newVariant.listTermIds;
export const termNewId = (state: RootState) => state.newVariant.termNewId;

export default newVariantReducer.reducer;
