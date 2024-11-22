import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDataRequest, StateProps } from './interface';
import uuidv4 from '../common/utils/uuidv4';

const initialState: StateProps = {
  numberSections: 0,
  dataSectionBanner: [],
  dataRequest: [],
  listLinkBanner: [],
};
const configShareApp = createSlice({
  name: 'config-share-app',
  initialState,
  reducers: {
    setNumberSections: (state, action: PayloadAction<number>) => {
      state.numberSections = action.payload;
    },
    setSections: (state, action: PayloadAction<IDataRequest>) => {
      state.dataRequest.push(action.payload);
    },
    resetScreenState: (state) => {
      state.dataRequest = initialState.dataRequest;
    },
    removeSectionItem: (state, action: PayloadAction<string>) => {
      state.dataRequest = state.dataRequest.filter(
        (section) => section.id !== action.payload
      );
    },
    getSection: (state, action: PayloadAction<any>) => {
      const data = action.payload?.map((item: any) => {
        return {
          ...item,
          id: uuidv4(),
        };
      });
      state.dataRequest = data;
    },
    updateSections: (state, action: PayloadAction<IDataRequest[]>) => {
      state.dataRequest = action.payload;
    },
  },
});

export const {
  setNumberSections,
  setSections,
  removeSectionItem,
  getSection,
  resetScreenState,
  updateSections,
} = configShareApp.actions;

export default configShareApp.reducer;
