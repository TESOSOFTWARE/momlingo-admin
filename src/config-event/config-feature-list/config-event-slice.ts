import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IConfigEventItem, IReduxPayloadEventConfigItem } from './config-event-interface';

const initialConfigEventState: StateProps = {
  isOpenConfirmModal: false,
  eventConfigRowItems: {
    code: '',
    desc: '',
    status: false,
    startDate: '',
    endDate: '',
  },
};

type StateProps = {
  isOpenConfirmModal: boolean;
  eventConfigRowItems: {
    code: string;
    desc: string;
    status: boolean;
    startDate: string;
    endDate: string;
  };
};

export const configEventReducer = createSlice({
  name: 'listConfigEvent',
  initialState: initialConfigEventState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setEventConfigRowItems: (
      state,
      action: PayloadAction<IReduxPayloadEventConfigItem>
    ) => {
      state.eventConfigRowItems.code = action.payload.code;
      state.eventConfigRowItems.desc = action.payload.desc;
      state.eventConfigRowItems.status = action.payload.status;
      state.eventConfigRowItems.startDate = action.payload.startDate;
      state.eventConfigRowItems.endDate = action.payload.endDate;
    },
  },
});

export const { setIsOpenConfirmModal, setEventConfigRowItems } =
  configEventReducer.actions;

export const isOpenConfirmModalSelector = (state: RootState) =>
  state.configEvent.isOpenConfirmModal;
export const eventConfigRowItemsSelector = (state: RootState) =>
  state.configEvent.eventConfigRowItems;

export default configEventReducer.reducer;
