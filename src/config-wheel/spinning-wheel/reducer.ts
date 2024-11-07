import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IUploadedFile } from './interface';

const initialState: IInitialState = {
  selectedItem: undefined,
  fileImage: null,
};
export const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<undefined | number>) => {
      state.selectedItem = action.payload;
    },
    getImageFile: (state, action: PayloadAction<IUploadedFile>) => {
      state.fileImage = action.payload;
    },
  },
});

export const {
  actions: { setSelectedItem, getImageFile },
  reducer,
} = wheelSlice;
