import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { dataPostCodeDefault } from '../code-create/create.constant';
import { PostCreateCode } from '../code-create/create.interface';
import { dataEditCodeDefault } from '../code-edit/edit.constant';
import { IEditCode } from '../code-edit/edit.interface';
import { defaulValuesSearchCode } from '../code-list/list.constants';
import { ISearchForm } from '../code-list/list.interface';
import { StatePropsCodeRelease } from './interface';

const initialState: StatePropsCodeRelease = {
  searchForm: defaulValuesSearchCode,
  isPopup: false,
  dataEditCode: dataEditCodeDefault,
  dataPostCode: dataPostCodeDefault,
  dataDeleteCode: [],
  isOpenQRCodeModal: false,
};

export const CodeRelaseSlice = createSlice({
  name: 'codeRelease',
  initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<ISearchForm>) => {
      state.searchForm = action.payload;
    },
    setPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setDataEditCode: (state, action: PayloadAction<IEditCode>) => {
      state.dataEditCode = action.payload;
    },
    setDataPostCode: (state, action: PayloadAction<PostCreateCode>) => {
      state.dataPostCode = action.payload;
    },
    setDataDeleteCode: (state, action: PayloadAction<string[]>) => {
      state.dataDeleteCode = action.payload;
    },
    setIsOpenQRCodeModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenQRCodeModal = action.payload;
    },
  },
});

export const {
  setSearchForm,
  setPopup,
  setDataEditCode,
  setDataPostCode,
  setDataDeleteCode,
  setIsOpenQRCodeModal,
} = CodeRelaseSlice.actions;

export const showPopup = (state: RootState) => state.codeRelease.isPopup;
export const searchForm = (state: RootState) => state.codeRelease.searchForm;
export const dataEditCode = (state: RootState) => state.codeRelease.dataEditCode;
export const dataPostCode = (state: RootState) => state.codeRelease.dataPostCode;
export const dataDeleteCode = (state: RootState) => state.codeRelease.dataDeleteCode;

export default CodeRelaseSlice.reducer;
