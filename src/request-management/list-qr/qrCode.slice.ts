import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fDateTime } from 'src/common/utils/formatTime';

const initialState: StateProps = {
  textSearch: '',
  startDate: null,
  endDate: null,
  qrSelected: -1,
  modalChangeStatus: false,
  valueChange: null,
};

type StateProps = {
  textSearch: string;
  startDate?: string | null;
  endDate?: string | null;
  selectedIds?: number[];
  qrSelected: number;
  modalChangeStatus: boolean;
  valueChange: boolean | null;
};

export const qrCodeSlice = createSlice({
  name: 'qrcode',
  initialState,
  reducers: {
    setTextSearch: (state, action: PayloadAction<string>) => {
      state.textSearch = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    setQrSelected: (state, action: PayloadAction<number>) => {
      state.qrSelected = action.payload;
    },
    setModalChangeStatus: (state, action: PayloadAction<boolean>) => {
      state.modalChangeStatus = action.payload;
    },
    setValueChange: (state, action: PayloadAction<boolean | null>) => {
      state.valueChange = action.payload;
    },
    setClearFilterSearch: (state) => {
      state.textSearch = '';
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const {
  setTextSearch,
  setStartDate,
  setEndDate,
  setQrSelected,
  setModalChangeStatus,
  setValueChange,
  setClearFilterSearch,
} = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
