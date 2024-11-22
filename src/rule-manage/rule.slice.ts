import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../common/redux/store';
import { IFormRuleConfigItem } from './interfaces';

const initialConfigFeatureState: StateProps = {
  isOpenConfirmModal: false,
  ruleConfigRowItems: {
    code: '',
    desc: '',
    status: false,
    values: {},
  },
  listRulesConfig: {},
};

type StateProps = {
  isOpenConfirmModal: boolean;
  ruleConfigRowItems: {
    code: string;
    desc?: string;
    status?: boolean;
    values?: any;
  };
  listRulesConfig?: any;
};

export const configRuleReducer = createSlice({
  name: 'listConfigRule',
  initialState: initialConfigFeatureState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setRuleConfigRowItems: (state, action: PayloadAction<IFormRuleConfigItem>) => {
      state.ruleConfigRowItems = action.payload;
    },
    setListRuleConfig: (state, action: PayloadAction<any>) => {
      state.listRulesConfig = action.payload;
    },
  },
});

export const { setIsOpenConfirmModal, setRuleConfigRowItems, setListRuleConfig } =
  configRuleReducer.actions;

export const isOpenConfirmModalSelector = (state: RootState) =>
  state.configRule.isOpenConfirmModal;
export const ruleConfigRowItemsSelector = (state: RootState) =>
  state.configRule.ruleConfigRowItems;
export const listRuleConfigSelector = (state: RootState) =>
  state.configRule.listRulesConfig;

export default configRuleReducer.reducer;
