import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './survey.interface';

const initialState: StateProps = {
  searchText: '',
  searchType: '',
  surveyList: [],
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },
    setConfirmModal: (state, action: PayloadAction<StateProps['confirmModal']>) => {
      state.confirmModal = action.payload;
    },
    closeConfirmModal: (state) => {
      state.confirmModal = {
        callback: () => {},
        isOpen: false,
        text: '',
      };
    },
  },
});

export const { setSearchText, setSearchType, setConfirmModal, closeConfirmModal } =
  surveySlice.actions;

export default surveySlice.reducer;
