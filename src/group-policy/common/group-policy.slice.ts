import { StateProps } from './interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: StateProps = {
  groupPolicySelected: '',
  searchText: '',
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
  searchPoliciesText: '',
};

export const groupPolicySlice = createSlice({
  name: 'group-policy',
  initialState,
  reducers: {
    setGroupPolicySelected: (state, action: PayloadAction<string>) => {
      state.groupPolicySelected = action.payload;
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
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },
    setSearchStatus: (state, action: PayloadAction<string>) => {
      state.searchStatus = action.payload;
    },
    setSearchPoliciesText: (state, action: PayloadAction<string>) => {
      state.searchPoliciesText = action.payload;
    },
  },
});

export const {
  setGroupPolicySelected,
  setConfirmModal,
  closeConfirmModal,
  setSearchText,
  setSearchType,
  setSearchStatus,
  setSearchPoliciesText,
} = groupPolicySlice.actions;

export default groupPolicySlice.reducer;
