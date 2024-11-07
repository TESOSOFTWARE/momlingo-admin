import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IEditSlice } from './interface';

const initialState: IEditSlice = {
  listFormAtt: [],
  page: 1,
  searchExternal: '',
  listTermIds: [],
  termIdNew: 0,
};
export const editVariantReducer = createSlice({
  name: 'editVariant',
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
    setTermIdNew: (state, action: PayloadAction<number>) => {
      state.termIdNew = action.payload;
    },
  },
});

export const { setListForm, setPage, setSearchExternal, setListTermIds, setTermIdNew } =
  editVariantReducer.actions;

export const listForm = (state: RootState) => state.editVariant.listFormAtt;
export const numberPage = (state: RootState) => state.editVariant.page;
export const searchExternal = (state: RootState) => state.editVariant.searchExternal;
export const listTermIds = (state: RootState) => state.editVariant.listTermIds;
export const termIdNew = (state: RootState) => state.editVariant.termIdNew;

export default editVariantReducer.reducer;
