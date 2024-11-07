import { Lang, LangObj } from './common.interfaces';

export const LANG: Record<Lang, Lang> = {
  en: 'en',
  vi: 'vi',
};

export const langs: Record<Lang, LangObj> = {
  en: {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  vi: {
    label: 'Vietnamese',
    value: 'vi',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
export const DATE_FORMAT = 'dd.MM.yyyy';

export enum BooleanEnum {
  TRUE = 1,
  FALSE = -1,
}

export const FIELD = {
  WOOD: 'wood',
};

export const BREADCUMBS = {
  DASHBOARD: 'Dashboard',
  LIST_EVENT: 'Sự kiện Promotion quý 4',
  CREATE_EVENT: 'Tạo mới sự kiện',
  VIEW_EVENT: 'Xem sự kiện',
  LIST_REGISTER_EVENT: 'List register event',
  LIST_POLICY_CATEGORY: 'List category policy',
  ADD_POLICY_CATEGORY: 'Add category',
  LIST_ENTERPRISE_CATEGORY: 'List category enterprise',
  CATEGORY_ENTERPRISE_LIST: 'List category enterprise ',
  CATEGORY_ENTERPRISE_EDIT: 'Category enterprise edit',
  CATEGORY_ENTERPRISE_NEW: 'category enterprise add new',
  SHOP_INVITATION: 'shop invitation',
  SHOP_INVITATION_lIST: 'shop invitation list',
  ADMIN_LIST: 'List admin',
  STORE_ADMIN: 'Cửa hàng',

  EVENT_PROMOTION_Q4: 'Sự kiện Promotion Quý 4',

  NEW_ADMIN: 'create admin',
  EDIT_EVENT_PRIZE: 'Chỉnh sửa quà tặng sự kiện',
  LIST_EVENT_PRIZE: 'Danh sách quà tặng sự kiện',

  CODE_LIST: 'Code Release List',
  CODE_CREATE: 'Code Release Create',
  CODE_EDIT: 'Code Release Edit',

  PRODUCT_LIST: 'Product List',
  PRODUCT_LIST_VN: 'Danh sách sản phẩm',
  PRODUCT_VN: 'Sản phẩm',
  PRODUCT_NEW: 'Product New',
  PRODUCT_NEW_VN: 'Thêm mới sản phẩm',
  PRODUCT_DETAILS: 'Product Details',
  PRODUCT_EDIT: 'Product Edit',

  ATTRIBUTE_TERM_NEW: 'Attribute Term New',
  ATTRIBUTE_TERM_LIST: 'Attribute Term List',

  CONFIG_FEATURE: 'Quản lý tracker',
  REQUEST: 'Quản lý yêu cầu',
  LIST_REQUEST: 'Danh sách yêu cầu',
  ATTRIBUTE: 'Thuộc tính sản phẩm',
  ATTRIBUTE_LIST: 'Danh sách thuộc tính',

  ORDER_MANAGEMENT: 'Quản lý đơn quà',
  SURVEY_MANAGE: 'Quản lý khảo sát',
  LIST_SURVEY: 'Danh sách khảo sát',
  SURVEY_CREATE: 'Tạo khảo sát',
  SURVEY_EDIT: 'Chỉnh sửa khảo sát',
  SURVEY_VIEW: 'Chi tiết khảo sát',

  QR_MANAGE: 'Quản lý QR Code',
  CREATE_SPOON: 'Create Spoon Code',
  CREATE_SBPS: 'Create SBPS Code',

  POPUP_MANAGE: 'Quản lý popup',
  TIER_RANK_MANAGE: 'Quản lý thứ hạng',
  GAME_MANAGE: 'Quản lý trò chơi',
  LIST_TAG: 'Danh sách tag',
  TAGS: 'Tags',
  EDIT_TAG: 'Chỉnh sửa Tag',
  LIST_STORE_IN_MAP: 'Danh sách cửa hàng (bản đồ)',
  STORE_IN_MAP: 'Cửa hàng (bản đồ) ',
  EDIT_STORE_IN_MAP: 'Chỉnh sửa cửa hàng (bản đồ)',
  MANAGE_STORE_EDIT: 'Chỉnh sửa thông tin cửa hàng',
  MANAGE_STORE_LIST: 'Danh sách cửa hàng',

  NEWS_LIST: 'News List',
  NEWS_LIST_VN: 'Danh sách tin tức',
  NEWS_VN: 'Tin tức',
  NEWS_NEW: 'News New',
  NEWS_NEW_VN: 'Thêm mới tin tức',
  NEWS_DETAILS: 'News Details',
  NEWS_EDIT: 'News Edit',

  NEWS_SUBJECT_VN: 'Chủ đề',
  NEWS_SUBJECT_LIST: 'Danh sách chủ đề',
  NEWS_SUBJECT_NEW_VN: 'Thêm mới chủ đề',
  NEWS_SUBJECT_DETAILS: 'News SUBJECT Details',
  NEWS_SUBJECT_EDIT: 'News SUBJECT Edit',
};
export const FORMAT_DATE_FILTER = 'MM-DD-YYYY HH:mm:ss';
export const DEFAULT_MAIN_COLOR = '#FFEAEA';
