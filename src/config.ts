// @mui
import { enUS, frFR, zhCN, viVN, arSD } from '@mui/material/locale';
// components
import { SettingsValueProps } from './common/components/settings/type';
// routes
import { PATH_DASHBOARD } from './common/routes/paths';

// API
// ----------------------------------------------------------------------
// This for call http API from https client. You can check here: https://stackoverflow.com/questions/60938091/make-api-request-to-http-endpoint-from-aws-amplify-deployed-https-ssl-client
// export const HOST_API = process.env.REACT_APP_BASE_URL;
export const HOST_API = 'http://54.251.243.96:3000/api';

// config deploy
export const BASE_PATH_DEPLOY = process.env.BASE_PATH_DEPLOY || '';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.event.list; // as '/dashboard/app'

// Config for App
export const CONFIG_APP_DETAIL = {
  name: 'MomLingo Admin',
  specialPath: process.env.BASE_PATH_DEPLOY ||'/'
}

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'bold',
  themeLayout: 'horizontal',
  themeColorPresets: 'baseMain',
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
];

export const defaultLang = allLangs[1]; // English
