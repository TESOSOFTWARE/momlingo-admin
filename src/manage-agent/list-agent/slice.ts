import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultValueFilter } from './constant';
import { IDeleteId, IListAgentParams, IListAgentSlice } from './interface';

const initialState: IListAgentSlice = {
  dataFilter: defaultValueFilter,
  isDeletePopup: false,
  idDelete: { ids: [] },
};

export const listAgentReducer = createSlice({
  name: 'listAgent',
  initialState,
  reducers: {
    setDataFilter(state, action: PayloadAction<IListAgentParams>) {
      state.dataFilter = action.payload;
    },
    setDeletePopup(state, action: PayloadAction<boolean>) {
      state.isDeletePopup = action.payload;
    },
    setIdDelete(state, action: PayloadAction<IDeleteId>) {
      state.idDelete = action.payload;
    },
  },
});

export const { setDataFilter, setDeletePopup, setIdDelete } = listAgentReducer.actions;

export const filter = (state: RootState) => state.listAgent.dataFilter;
export const popup = (state: RootState) => state.listAgent.isDeletePopup;
export const idDel = (state: RootState) => state.listAgent.idDelete;

export default listAgentReducer.reducer;
