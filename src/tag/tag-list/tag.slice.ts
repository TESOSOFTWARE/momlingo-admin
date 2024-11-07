import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateProps } from './interface';

const initialState: IStateProps = {
  idsDelete: [],
  isPopupDelete: false,
};

export const tagSlice = createSlice({
  name: 'tag_list',
  initialState,
  reducers: {
    setIdsDelete: (state, action: PayloadAction<number[]>) => {
      state.idsDelete = action.payload;
    },
    setPopupDelete: (state, action: PayloadAction<boolean>) => {
      state.isPopupDelete = action.payload;
    },
  },
});

export const { setIdsDelete, setPopupDelete } = tagSlice.actions;

export default tagSlice.reducer;
