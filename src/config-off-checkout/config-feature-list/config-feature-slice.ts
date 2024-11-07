import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import {
  IConfigFeatureItem,
  IReduxPayloadFeatureConfigItem,
} from './config-feature-interface';

const initialConfigFeatureState: StateProps = {
  isOpenConfirmModal: false,
  featureConfigRowItems: {
    code: '',
    desc: '',
    status: false,
  },
};

type StateProps = {
  isOpenConfirmModal: boolean;
  featureConfigRowItems: {
    code: string;
    desc: string;
    status: boolean;
  };
};

export const configFeatureReducer = createSlice({
  name: 'listConfigFeature',
  initialState: initialConfigFeatureState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setFeatureConfigRowItems: (
      state,
      action: PayloadAction<IReduxPayloadFeatureConfigItem>
    ) => {
      state.featureConfigRowItems.code = action.payload.code;
      state.featureConfigRowItems.desc = action.payload.desc;
      state.featureConfigRowItems.status = action.payload.status;
    },
  },
});

export const { setIsOpenConfirmModal, setFeatureConfigRowItems } =
  configFeatureReducer.actions;

export const isOpenConfirmModalSelector = (state: RootState) =>
  state.configFeature.isOpenConfirmModal;
export const featureConfigRowItemsSelector = (state: RootState) =>
  state.configFeature.featureConfigRowItems;

export default configFeatureReducer.reducer;
