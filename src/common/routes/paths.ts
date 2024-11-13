// ----------------------------------------------------------------------
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT_AUTH = '/auth';
export const ROOT_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login'),
  register: path(ROOT_AUTH, '/register'),
  loginUnprotected: path(ROOT_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOT_AUTH, '/register-unprotected'),
  verify: path(ROOT_AUTH, '/verify'),
  resetPassword: path(ROOT_AUTH, '/reset-password'),
  newPassword: path(ROOT_AUTH, '/new-password'),
  forgotPassword: path(ROOT_AUTH, '/forgot-password'),
  emailConfirmation: path(ROOT_AUTH, '/email-confirmation'),
  approvedNotification: path(ROOT_AUTH, '/pending-approval'),
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  // root: '/',
  root: '/',

  general: {
    app: path(ROOT_DASHBOARD, '/app'),
  },
  event: {
    root: path(ROOT_DASHBOARD, '/event'),
    list: path(ROOT_DASHBOARD, '/event/list'),
    edit: path(ROOT_DASHBOARD, '/event/edit/:key'),
    editEvent: (id: string) => path(ROOT_DASHBOARD, `/event/edit/${id}`),
    create: path(ROOT_DASHBOARD, '/event/create'),
  },
  merchant: {
    root: path(ROOT_DASHBOARD, '/merchant'),
    settings: path(ROOT_DASHBOARD, '/merchant/settings'),
    change_password: path(ROOT_DASHBOARD, '/merchant/change-password'),
  },
  code: {
    root: path(ROOT_DASHBOARD, '/code'),
    list: path(ROOT_DASHBOARD, '/code/list'),
    create: path(ROOT_DASHBOARD, '/code/create'),
    edit: (code: string) => path(ROOT_DASHBOARD, `/code/edit/${code}`),
  },

  winningHistory: {
    list: path(ROOT_DASHBOARD, '/winning-history'),
  },
  configWheel: {
    root: path(ROOT_DASHBOARD, '/config-wheel'),
    create: path(ROOT_DASHBOARD, '/config-wheel/create'),
  },
  configFeature: {
    root: path(ROOT_DASHBOARD, '/config'),
    list: path(ROOT_DASHBOARD, '/config/feature/list'),
    new:{
      babyTracker: path(ROOT_DASHBOARD,`/config/babyTrack/new`),
      childTracker: path(ROOT_DASHBOARD,`/config/childTracker/new`)
    },
    edit:{
      babyTracker: path(ROOT_DASHBOARD,`/config/babyTrack/edit/:week`),
      childTracker: path(ROOT_DASHBOARD,`/config/childTracker/edit/:week`)
    }
  },
  configEvent: {
    root: path(ROOT_DASHBOARD, '/config/event'),
    list: path(ROOT_DASHBOARD, '/config/event/list'),
  },
  gift: {
    root: path(ROOT_DASHBOARD, '/gift'),
    list: path(ROOT_DASHBOARD, '/gift/list'),
    create: path(ROOT_DASHBOARD, '/gift/create'),
  },
  product: {
    root: path(ROOT_DASHBOARD, '/product'),
    list: path(ROOT_DASHBOARD, '/product/list'),
    new: path(ROOT_DASHBOARD, '/product/new'),
    detail: path(ROOT_DASHBOARD, '/product/detail/:id'),
    edit: path(ROOT_DASHBOARD, '/product/edit/:id'),
  },
  product_attribute: {
    root: path(ROOT_DASHBOARD, '/product-attribute'),
    list: path(ROOT_DASHBOARD, '/product-attribute/list'),
    new: path(ROOT_DASHBOARD, '/product-attribute/new'),
    edit: path(ROOT_DASHBOARD, '/product-attribute/edit/:id'),
  },
  product_attribute_term: {
    root: path(ROOT_DASHBOARD, '/product-attribute-term'),
    list: path(ROOT_DASHBOARD, '/product-attribute-term/list'),
    new: path(ROOT_DASHBOARD, '/product-attribute-term/new'),
    edit: path(ROOT_DASHBOARD, '/product-attribute-term/edit/:id'),
  },
  product_variant: {
    root: path(ROOT_DASHBOARD, '/product-variant'),
    list: path(ROOT_DASHBOARD, '/product-variant/list'),
    new: path(ROOT_DASHBOARD, '/product-variant/new'),
    edit: path(ROOT_DASHBOARD, '/product-variant/edit/:id'),
  },
  order_management: {
    root: path(ROOT_DASHBOARD, '/order_management'),
    list_physical: path(ROOT_DASHBOARD, '/order_management/list-physical'),
    detail: path(ROOT_DASHBOARD, '/order_management/detail/:id'),
    detailProd:path(ROOT_DASHBOARD, '/order_management/detailProduct/:id/:idProd'),
    edit: path(ROOT_DASHBOARD, '/order_management/edit/:id'),
    list_voucher: path(ROOT_DASHBOARD, '/order_management/list-voucher'),
    list_refund: path(ROOT_DASHBOARD, '/order_management/list-refund-coin'),
    view_refund: (id: string) =>
      path(ROOT_DASHBOARD, `/order_management/refund-detail/${id}`),
    list_refund_request: path(ROOT_DASHBOARD, '/order_management/list-refund-request'),

  },
  homeConfig: {
    root: path(ROOT_DASHBOARD, '/home-config'),
    editBanner: (id: string) => path(ROOT_DASHBOARD, `/home-config/edit-banner/${id}`),
    editNormalService: (id: string) =>
      path(ROOT_DASHBOARD, `/home-config/edit-normal-service/${id}`),
    editHorizontalProduct: (id: string, type: string) =>
      path(ROOT_DASHBOARD, `/home-config/edit-horizontal-product/${type}/${id}`),
  },
  point: {
    root: path(ROOT_DASHBOARD, '/point'),
    list: path(ROOT_DASHBOARD, '/point/list'),
    new: path(ROOT_DASHBOARD, '/point/new'),
    edit: path(ROOT_DASHBOARD, '/point/edit/:id'),
  },
  survey: {
    root: path(ROOT_DASHBOARD, '/survey'),
    list: path(ROOT_DASHBOARD, '/survey/list'),
    edit: (id: number) => path(ROOT_DASHBOARD, `/survey/edit/${id}`),
    create: path(ROOT_DASHBOARD, '/survey/create'),
    view: (id: number) => path(ROOT_DASHBOARD, `/survey/${id}`),
    view_user: (id: number) => path(ROOT_DASHBOARD, `/survey/survey-history/${id}`),
    view_user_detail: (surveyId: number, userId: number) =>
      path(ROOT_DASHBOARD, `/survey/survey-history/${surveyId}/detail/${userId}`),
  },
  requestManage: {
    root: path(ROOT_DASHBOARD, '/request'),
    list: path(ROOT_DASHBOARD, '/request/list'),
    listDownload: path(ROOT_DASHBOARD, '/request/list-history-file'),
    createSpoon: path(ROOT_DASHBOARD, '/request/createSpoon'),
    createSBPS: path(ROOT_DASHBOARD, '/request/createSBPS'),
    detail: (fileId: string) => path(ROOT_DASHBOARD, `/request/detail/${fileId}`),
    listQR: path(ROOT_DASHBOARD, '/request/listQR'),
  },
  popupManage: {
    root: path(ROOT_DASHBOARD, '/popup'),
    list: path(ROOT_DASHBOARD, '/popup/list'),
    create: path(ROOT_DASHBOARD, '/popup/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/popup/edit/${id}`),
  },
  feedbackManage: {
    root: path(ROOT_DASHBOARD, '/feedback'),
    list: path(ROOT_DASHBOARD, '/feedback/list'),
  },
  chartManage: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    order: path(ROOT_DASHBOARD, '/analytics/order'),
    game: path(ROOT_DASHBOARD, '/analytics/game'),
  },
  manageAgent: {
    root: path(ROOT_DASHBOARD, '/agent'),
    list: path(ROOT_DASHBOARD, '/agent/list'),
    new: path(ROOT_DASHBOARD, '/agent/new'),
    edit: path(ROOT_DASHBOARD, '/agent/edit/:id'),
  },
  groupPolicy: {
    root: path(ROOT_DASHBOARD, '/group-policy'),
    list: path(ROOT_DASHBOARD, '/group-policy/list'),
    create: path(ROOT_DASHBOARD, '/group-policy/create'),
    edit: path(ROOT_DASHBOARD, '/group-policy/edit/:id'),
  },

  userManagement: {
    root: path(ROOT_DASHBOARD, '/user-management'),
    list: path(ROOT_DASHBOARD, '/user-management/list'),
    view: (userId: number) => path(ROOT_DASHBOARD, `/user-management/detail/${userId}`),
    listGroupUser: path(ROOT_DASHBOARD, `/user-management/list-group-user`),
    createGroupUser: path(ROOT_DASHBOARD, '/user-management/create-group-user'),
    editGroupUser: (userId: number) =>
      path(ROOT_DASHBOARD, `/user-management/edit-group-user/${userId}`),
    listIntroduceUser: path(ROOT_DASHBOARD, `/user-management/list-introduce-user`),
    editUser: (userId: number) => path(ROOT_DASHBOARD, `/user-management/edit/${userId}`),
  },

  category: {
    root: path(ROOT_DASHBOARD, '/category'),
    new: path(ROOT_DASHBOARD, '/category/new'),
    list: path(ROOT_DASHBOARD, '/category/list'),
    edit: (categoryId: number) => path(ROOT_DASHBOARD, `/category/edit/${categoryId}`),
  },

  tag: {
    root: path(ROOT_DASHBOARD, '/tag'),
    list: path(ROOT_DASHBOARD, '/tag/list'),
    edit: path(ROOT_DASHBOARD, '/tag/edit/:id'),
    new: path(ROOT_DASHBOARD, '/tag/new'),
  },
  storeInMap: {
    root: path(ROOT_DASHBOARD, '/store-in-map'),
    list: path(ROOT_DASHBOARD, '/store-in-map/list'),
    edit: path(ROOT_DASHBOARD, '/store-in-map/edit/:id'),
    new: path(ROOT_DASHBOARD, '/store-in-map/new'),
  },
  tierRankManage: {
    root: path(ROOT_DASHBOARD, '/tier-rank'),
    list: path(ROOT_DASHBOARD, '/tier-rank/list'),
    create: path(ROOT_DASHBOARD, '/tier-rank/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/tier-rank/edit/${id}`),
  },
  gameManage: {
    root: path(ROOT_DASHBOARD, '/game'),
    list: path(ROOT_DASHBOARD, '/game/list'),
    create: path(ROOT_DASHBOARD, '/game/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/game/edit/${id}`),
    winHistory: path(ROOT_DASHBOARD, '/game/game-win-history'),
  },
  notificationManage: {
    root: path(ROOT_DASHBOARD, '/notification'),
    list: path(ROOT_DASHBOARD, '/notification/list'),
    create: path(ROOT_DASHBOARD, '/notification/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/notification/edit/${id}`),
  },
  manageStore: {
    root: path(ROOT_DASHBOARD, '/manage-store'),
    list: path(ROOT_DASHBOARD, '/manage-store/list'),
    create: path(ROOT_DASHBOARD, '/manage-store/create'),
    edit: path(ROOT_DASHBOARD, '/manage-store/edit/:id'),
    detail: path(ROOT_DASHBOARD, '/manage-store/detail/:id'),
  },

  termPolicy: {
    root: path(ROOT_DASHBOARD, '/term-policy'),
    list: path(ROOT_DASHBOARD, '/term-policy/list'),
    create: path(ROOT_DASHBOARD, '/term-policy/create'),
    edit: (id: number) => path(ROOT_DASHBOARD, `/term-policy/edit/${id}`),
    view: (id: number) => path(ROOT_DASHBOARD, `/term-policy/view/${id}`),
  },

  fileManage: {
    root: path(ROOT_DASHBOARD, '/file-manage'),
    listFileExport: path(ROOT_DASHBOARD, '/file-manage/list-export'),
    listFileImport: path(ROOT_DASHBOARD, '/file-manage/list-import'),
  },

  news: {
    root: path(ROOT_DASHBOARD, '/news'),
    list: path(ROOT_DASHBOARD, '/news/list'),
    new: path(ROOT_DASHBOARD, '/news/new'),
    detail: path(ROOT_DASHBOARD, '/news/detail/:id'),
    edit: path(ROOT_DASHBOARD, '/news/edit/:id'),
  },
  news_subject: {
    root: path(ROOT_DASHBOARD, '/subject'),
    list: path(ROOT_DASHBOARD, '/subject/list'),
    new: path(ROOT_DASHBOARD, '/subject/new'),
    edit: path(ROOT_DASHBOARD, '/subject/edit/:id'),
  },
  historyScan: {
    root: path(ROOT_DASHBOARD, '/history-scan'),
    list: path(ROOT_DASHBOARD, '/history-scan/list'),
    list_duplicate: path(ROOT_DASHBOARD, '/history-scan/list-duplicate'),
  },
  ruleManage: {
    root: path(ROOT_DASHBOARD, '/config'),
    list: path(ROOT_DASHBOARD, '/config/rule/list'),
    detail: (id: string) => path(ROOT_DASHBOARD, `/rule-config/detail/${id}`),
    edit: (id: string) => path(ROOT_DASHBOARD, `/rule-config/edit/${id}`),
  },

  gameGift: {
    root: path(ROOT_DASHBOARD, '/game'),
    list: (id: string) => path(ROOT_DASHBOARD, `/game/${id}/game-gift/list`),
    create: (id: string) => path(ROOT_DASHBOARD, `/game/${id}/game-gift/create`),
    detail: (gameId: string, giftId: string) =>
      path(ROOT_DASHBOARD, `/game/${gameId}/game-gift/${giftId}`),
    edit: (gameId: string, giftId: string) =>
      path(ROOT_DASHBOARD, `/game/${gameId}/game-gift/${giftId}/edit`),
  },

  configPlayTime: {
    root: path(ROOT_DASHBOARD, '/config-play-time'),
    list: path(ROOT_DASHBOARD, '/config-play-time/list'),
    create: path(ROOT_DASHBOARD, '/config-play-time/create'),
    edit: path(ROOT_DASHBOARD, '/config-play-time/:id'),
  },

  configApp: {
    root: path(ROOT_DASHBOARD, '/config/app'),
    list: path(ROOT_DASHBOARD, '/config/app/list'),
  },

  analyticsApp: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    listChart: path(ROOT_DASHBOARD, '/analytics/app/list-chart'),
  },
  analyticsPoint: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    listChart: path(ROOT_DASHBOARD, '/analytics/point/chart'),
  },
  analyticsSpoonUsed: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    listChart: path(ROOT_DASHBOARD, '/analytics/spoon-used/chart'),
  },
  analyticsSpoonUnused: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    listChart: path(ROOT_DASHBOARD, '/analytics/spoon-unused/chart'),
  },
  analyticsScan: {
    root: path(ROOT_DASHBOARD, '/analytics'),
    listChart: path(ROOT_DASHBOARD, '/analytics/scan/chart'),
  },
  configShareApp: {
    root: path(ROOT_DASHBOARD, '/config-share-app'),
    editBanner: (id: string) => path(ROOT_DASHBOARD, `/config-share-app/edit-banner/${id}`),
  },
};
