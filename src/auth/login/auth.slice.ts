import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type AuthLoginProps = {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  adminData: AdminProps;
};

type AdminProps = {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  deviceId?: string;
  deviceToken?: string;
  deviceType?: string;
  role?: string;
  loginType?: string;
  lan?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  partner?: any;
  childrenAsMother?: any;
  childrenAsFather?: any;
  children?: any;
  accessToken: string;
};

const initialState: AuthLoginProps = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  adminData: {
    id: '0001',
    name: 'admin',
    email: 'null',
    password: 'null',
    avatarUrl: 'null',
    accessToken: '',
  },
};

export const authLoginSlice = createSlice({
  name: 'authLogin',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setAdminData: (state, action: PayloadAction<AdminProps>) => {
      state.adminData = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.adminData = initialState.adminData;
    },
  },
});

export const { setLogin, setLogout, setAccessToken, setRefreshToken, setAdminData } =
  authLoginSlice.actions;
export const loginSelector = (state: RootState) => state.authLogin.isAuthenticated;
export const accessTokenSelector = (state: RootState) => state.authLogin.accessToken;
export const refreshTokenSelector = (state: RootState) => state.authLogin.refreshToken;
export const adminDataSelector = (state: RootState) => state.authLogin.adminData;

export default authLoginSlice.reducer;
