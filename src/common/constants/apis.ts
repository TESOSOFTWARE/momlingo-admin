// auth
export const API_LOGIN = 'api/v1/auth/login';

// routes article
export const API_PRESIGNED = '/file/presigned-url';
export const API_PRESIGN_URL = '/file/presigned-url';
export const API_EVENT = '/merchant/event';
// -----------------
export const API_SHOP_INVITATION = '/admin/store-invitation';
export const API_SHOP_INVITATION_EXPORTCSV = '/admin/store-invitation/export/csv';
export const API_ADMIN = '/admin';
export const API_STORE_ADMIN = '/admin/store';
export const API_ADMIN_FORGOTPASSWORD = '/admin/forgot-password';
export const API_PRIZE_HISTORY = '/admin/event-point-history';
export const API_LIST_PRiZE = '/admin/events/details';
export const API_TRANSACTION_TYPE = '/admin/crm-transaction-type';
export const API_PROVINCE = '/province';
export const API_CREATE_EVENT = '/admin/events/details';
export const API_PRIZE_EDIT = 'admin/events/details';
export const API_EDIT_EVENT_PRIZE = 'admin/events/details';
export const API_PROVINCE_VN = 'province/vn';
export const API_GET_ALL_GIFTS = 'admin/gift';

// --------------------
export const API_MERCHANT_FORGOTPASSWORD = '/merchat/forgot-password';
export const API_MERCHANT_REGISTER = '/merchant/auth/register';
export const API_CODE_RELEASE = '/merchant/event-code';
export const API_CODE_POST = '/merchant/event-code/generate';
export const API_MERCHANT_WINNING_HISTORY = '/merchant/event/win-history';
export const API_MERCHANT_PROFILE = '/merchant/profile';
export const API_MERCHANT_GIFT = '/merchant/gift';
export const API_WHEEL = '/merchant/event';
export const API_GIFT = '/merchant/gift';
export const API_PRODUCT = '/merchant/product';
export const API_TAG = '/merchant/tag';
export const API_CATEGORY = '/merchant/category';
export const API_PRODUCT_ATTRIBUTE_MERCHANT = '/merchant/product-attribute';
export const API_PRODUCT_ATTRIBUTE_TERM_MERCHANT = '/merchant/product-attribute-term';
export const API_VARIANT = '/merchant/product-variant';
export const API_HOME_CONFIG = '/merchant/home-config';
export const API_REQUEST_REFUND = '/merchant/order/refund-point';
export const API_REJECT_REFUND = '/merchant/order/reject-refund-point';
export const API_ORDER_MANAGEMENT = '/merchant/order';
export const API_EXTERNAL = '/merchant/external-product';
export const API_CONFIG_FEATURE = '/merchant/feature-config';
export const API_CONFIG_EVENT = '/merchant/event-config';
export const API_POINT = '/merchant/system-config-point';
// QR
export const API_APPROVE_DOWNLOAD_FILE = '/merchant/approve-download-file';
export const API_REQUEST_DOWNLOAD_FILE = '/merchant/request-download-file';
export const API_GET_REQUEST = '/merchant/request-file';
export const API_GET_HISTORY_DOWNLOAD = '/merchant/download-history';
export const API_LIMIT_SPOON = '/merchant/config-limit-code';

export const API_POST_APPROVED = '/merchant/approve-file';
export const API_POST_REJECT = '/merchant/reject-file';
export const API_REJECT_DOWNLOAD = '/merchant/reject-download-file';

export const API_SURVEY = '/merchant/survey';
export const API_SURVEY_HISTORY = '/merchant/survey-history';
export const API_SURVEY_HISTORY_DETAIL =
  '/merchant/survey-history/user-survey-answer-detail';
export const API_REQUEST_EXPORT_SURVEY_HISTORY =
  API_SURVEY_HISTORY + '/request-export-user-join-survey';
export const API_REQUEST_EXPORT_SURVEY_HISTORY_DETAIL =
  API_SURVEY_HISTORY + '/request-export-user-survey-answer-detail';
export const API_GET_PRODUCTGROUP_SPOON = '/merchant/system-config-point/product-group';
export const API_GET_QUANTITY_SPOON = '/merchant/system-config-point/weight';
export const API_GET_SBPS_CODE = '/merchant/system-config-point/code-sbps';
export const API_CREATE_REQUEST_CODE = '/merchant/request-file-spoon-code';
export const API_QR_CODE = '/merchant/add-point-code';
export const API_MOBILE_ROUTE = '/mobile-routes';

// Manage-agent
export const API_AGENT = '/merchant/agent';

// Casl-merchant
export const API_CASL = '/merchant/casl/group-policy';
export const API_GROUP_POLICY = '/merchant/casl/group-policy';
// Home popup
export const API_HOME_POPUP = '/merchant/popup-config';

// user-Management
export const API_GET_LIST_USER = '/api/v1/users';
export const API_GET_LIST_USER_INTRODUCE = '/merchant/referral-history';

// Merchant-password
export const API_MERCHANT_PASSWORD = '/merchant/profile/password';
export const API_CUSTOMER_PRODUCT = '/customer/product';

export const API_MERCHANT_POLICIES = '/merchant/auth/current';
// Tier Rank
export const API_TIER_RANK = '/merchant/tier-config';
// Game
export const API_GAME = '/merchant/game';
export const API_TYPE_GAME = '/merchant/game-type';
export const API_GAME_WIN_HISTORY = '/merchant/game-win-history';
// Notification
export const API_NOTI = '/merchant/noti';
// Push-order-delivery
export const API_ORDER_DELIVERY = '/express-delivery/express-delivery';
export const API_PROVINCES = '/express-delivery/provinces';
export const API_DISTRICT = '/express-delivery/district';
export const API_SHOP = '/express-delivery/shop';
export const API_SERVICES = '/express-delivery/available-services';

// User-policies
export const API_POLICIES = '/merchant/casl/policies';

// Request-export
export const API_REQUEST_EXPORT = '/merchant/request-export';
// Request-import
export const API_GET_LIST_FILE_IMPORT = '/merchant/request-import';
// Group-user
export const API_GROUP_USER = '/merchant/user-group';
export const API_DELETE_GROUP_USER = '/merchant/user-group/multiple';

// External-referrer
export const API_EXTERNAL_REFERRER = '/merchant/external-referrer';
export const API_IMPORT_EXTERNAL_REFERRER = '/merchant/external-referrer/request-import';
export const API_EXTERNAL_REFERRER_HISTORY = '/merchant/external-referral-history';

// TermPolicy
export const API_TERM_POLICY = '/merchant/terms-policy';

// News
export const API_NEWS = '/merchant/news';
export const API_SUBJECT = '/merchant/subject';
// history-scan
export const API_HISTORY_SCAN = '/merchant/scan-history';

// Get address
export const API_GET_ADDRESS = '/customer/province';
export const API_GET_ADDRESS_MERCHANT = '/merchant/province';

// rule-list
export const API_RULE_CONFIG = 'merchant/rule-config';
// refund-order
export const API_REFUND_ORDER = 'merchant/order/refund-order';

export const API_REFUND_POINT = 'merchant/order/refund-point';

export const API_STORE_IN_MAP = '/merchant/store';
export const API_GAME_GIFTS = 'merchant/game-gift';

export const API_GAME_CONFIG_PLAYTIME = 'merchant/game-play-time-config';
export const API_EXPORT_REFUND_ORDER = 'merchant/order/export-order-refund';

export const API_FEEDBACK = 'merchant/user-feedback';
// config App
export const API_CONFIG_APP = 'merchant/app-config';

// analytics
export const API_STATISTIC_POINT = 'merchant/statistic-point';
export const API_STATISTIC_SPOON = 'merchant/statistic-spoon';
export const API_STATISTIC_SCAN = 'merchant/statistic-scan';

export const API_ORDER_CHART = 'merchant/statistic-order';
export const API_GAME_CHART = 'merchant/statistic-game';

// share-app-config
export const API_SHARE_APP_CONFIG = 'merchant/share-app-config';

// duplicate-scan
export const API_DUPLICATE_SCAN = 'merchant/add-point-code-dup';

// 
export const API_BABY_TRACKERS = '/api/v1/baby-trackers';
export const API_BABY_REMOVE_TRACKERS = '/api/v1/baby-trackers/week';
export const API_BABY_CREATE_TRACKERS = '/api/v1/baby-trackers';
export const API_BABY_EDIT_TRACKERS = '/api/v1/baby-trackers';

