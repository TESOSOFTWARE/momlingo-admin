import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { defaultValueFile, defaultValueSearch } from './list-constants';
import { ISliceForm, ISearchRequest, IFormRequest } from './list-interface';

const initialState: ISliceForm = {
  searchForm: defaultValueSearch,
  isExport: false,
  id: 0,
  isLoading: false,
  exportSuccess: false,

  nameFile: '',
};

export const requestListSlice = createSlice({
  name: 'listRequest',
  initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<ISearchRequest>) => {
      state.searchForm = action.payload;
    },
    setExportPopup: (state, action: PayloadAction<boolean>) => {
      state.isExport = action.payload;
    },
    setFileId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setNameFile: (state, action: PayloadAction<string>) => {
      state.nameFile = action.payload;
    },
    setExportSuccess: (state, action: PayloadAction<boolean>) => {
      state.exportSuccess = action.payload;
    },
  },
});

export const {
  setSearchForm,
  setNameFile,
  setExportPopup,
  setFileId,
  setExportSuccess,
  setLoading,
} = requestListSlice.actions;
export const dataSearch = (state: RootState) => state.request.searchForm;
export const isExportPopup = (state: RootState) => state.request.isExport;
export const idFile = (state: RootState) => state.request.id;
export const loading = (state: RootState) => state.request.isLoading;
export const nameFile = (state: RootState) => state.request.nameFile;
export const exportSuccess = (state: RootState) => state.request.exportSuccess;

export default requestListSlice.reducer;
