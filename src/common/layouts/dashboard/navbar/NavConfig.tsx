// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// path momlingo
import Iconify from 'src/common/components/Iconify';
import i18n from 'src/common/locales/i18n';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { Action, ActionAbility, Resource } from '../../../constants/common.interfaces';
import vn from '../../../locales/vn';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  subject: getIcon('ic_news_subject'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  setting: getIcon('ic_menu_item'),
  policy: getIcon('ic_policy'),
  document: getIcon('ic_policy'),
  storeInMap: getIcon('ic_store_in_map'),
  product: <Iconify icon="fluent-mdl2:product-variant" />,
  order: <Iconify icon="icon-park-outline:transaction-order" />,
  attribute: <Iconify icon="carbon:carbon-for-ibm-product" />,
  term: <Iconify icon="fluent:task-list-square-add-20-regular" />,
  variant: <Iconify icon="fluent-mdl2:product-release" />,
  config: <Iconify icon="eos-icons:configuration-file-outlined" />,
  point: <Iconify icon="teenyicons:ms-powerpoint-solid" />,
  survey: <Iconify icon="wpf:survey" />,
  popup: <Iconify icon="entypo:popup" />,
  manageAgent: <Iconify icon="wpf:administrator" />,
  userManage: <Iconify icon="mdi:user-box" />,
  category: <Iconify icon="bxs:category-alt" />,
  tag: <Iconify icon="mingcute:tag-line" />,
  homeScreen: <Iconify icon="gg:home-screen" />,
  tierRank: <Iconify icon="fa6-solid:ranking-star" />,
  notification: <Iconify icon="mdi:notification-settings" />,
  wheel: <Iconify icon="mdi:dharma-wheel" />,
  homeSetting: <Iconify icon="ep:setting" />,
  history: <Iconify icon="material-symbols:history-rounded" />,
  store: <Iconify icon="ic:sharp-store-mall-directory" />,
  giftOrder: <Iconify icon="ph:gift-bold" />,
  historyScan: <Iconify icon="mdi:magnify-scan" />,
  configFeature: getIcon('ic_config_event'),
  game: <Iconify icon="ion:game-controller" />,
  feedback: <Iconify icon="fluent:person-feedback-28-regular" />,

  news: <Iconify icon="fluent:news-28-regular" />,
};

const navConfig = [
  {
    subheader: 'Analytics',
    items: [
      {
        title: i18n.t('statistic'),
        path: PATH_DASHBOARD.analyticsApp.root,
        icon: ICONS.analytics,
        action: Action.READ,
        resource: Resource.STATISTIC,
        actionAbility: ActionAbility.CAN,
        children: [
          // { title: 'Các biểu đồ thống kê', path: PATH_DASHBOARD.analyticsApp.listChart },
          // { title: i18n.t('analystSpoon.title') , path: PATH_DASHBOARD.analyticsSpoon.listChart },
          // {
          //   title: i18n.t('chartManage.order'),
          //   path: PATH_DASHBOARD.chartManage.order,
          // },
          // {
          //   title: i18n.t('chartManage.game'),
          //   path: PATH_DASHBOARD.chartManage.game,
          // },

          {
            title: i18n.t('analystPoint.title'),
            path: PATH_DASHBOARD.analyticsPoint.listChart,
          },
          // {
          //   title: i18n.t('analystScan.title'),
          //   path: PATH_DASHBOARD.analyticsScan.listChart,
          // },
          // {
          //   title: i18n.t('analystSpoonUsed.title'),
          //   path: PATH_DASHBOARD.analyticsSpoonUsed.listChart,
          // },
          // {
          //   title: i18n.t('analystSpoonUnused.title'),
          //   path: PATH_DASHBOARD.analyticsSpoonUnused.listChart,
          // },
        ],
      },
    ],
  },
  {
    subheader: 'app',
    items: [
      // user management
      {
        action: Action.READ,
        resource: Resource.CUSTOMER,
        actionAbility: ActionAbility.CAN,
        title: i18n.t('userManage.title'),
        path: PATH_DASHBOARD.userManagement.root,
        icon: ICONS.userManage,
        children: [
          {
            title: i18n.t('userManage.list'),
            path: PATH_DASHBOARD.userManagement.list,
          },
          // {
          //   title: i18n.t('groupUser.list'),
          //   path: PATH_DASHBOARD.userManagement.listGroupUser,
          // },
          // {
          //   title: i18n.t('introduceUser.list'),
          //   path: PATH_DASHBOARD.userManagement.listIntroduceUser,
          // },
        ],
      },
      // feature
      {
        title: vn.configFeature,
        path: PATH_DASHBOARD.configFeature.root,
        icon: ICONS.configFeature,
        action: Action.READ,
        resource: Resource.SYSTEM_CONFIG,
        actionAbility: ActionAbility.CAN,
        children: [
          { title: vn.ListConfigFeature, path: PATH_DASHBOARD.configFeature.list },
          { title: i18n.t('ruleManage.list'), path: PATH_DASHBOARD.ruleManage.list },
          // { title: i18n.t('configEvent.list'), path: PATH_DASHBOARD.configEvent.list },
          // { title: i18n.t('configApp.title'), path: PATH_DASHBOARD.configApp.list },
        ],
      },
      // category
      {
        action: Action.READ,
        resource: Resource.CATEGORY,
        actionAbility: ActionAbility.CAN,
        title: 'Tên',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          {
            title: 'Danh sách tên',
            path: PATH_DASHBOARD.category.list,
          },
          {
            title: 'Thêm mới tên',
            path: PATH_DASHBOARD.category.new,
          },
        ],
      },
      // music tool
      {
        action: Action.READ,
        resource: Resource.MUSIC_TOOL,
        actionAbility: ActionAbility.CAN,
        title: 'Quản lý âm nhạc',
        path: PATH_DASHBOARD.musicTool.root,
        icon: ICONS.category,
        children: [
          {
            title: 'Danh sách bài hát',
            path: PATH_DASHBOARD.musicTool.list,
          },
          {
            title: 'Thêm mới bài hát',
            path: PATH_DASHBOARD.musicTool.new,
          },
        ],
      },

      // tag
      // {
      //   action: Action.READ,
      //   resource: Resource.TAG,
      //   actionAbility: ActionAbility.CAN,
      //   title: 'Tag',
      //   path: PATH_DASHBOARD.tag.root,
      //   icon: ICONS.tag,
      //   children: [
      //     {
      //       title: 'Danh sách Tag',
      //       path: PATH_DASHBOARD.tag.list,
      //     },
      //     {
      //       title: 'Thêm mới Tag',
      //       path: PATH_DASHBOARD.tag.new,
      //     },
      //   ],
      // },

      // product attribute
      // {
      //   action: Action.READ,
      //   resource: Resource.PRODUCT,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('attribute.new.titleAttribute'),
      //   path: PATH_DASHBOARD.product_attribute.root,
      //   icon: ICONS.attribute,
      //   children: [
      //     {
      //       title: i18n.t('attribute.new.titleList'),
      //       path: PATH_DASHBOARD.product_attribute.list,
      //     },
      //     {
      //       title: i18n.t('attribute.new.titleNew'),
      //       path: PATH_DASHBOARD.product_attribute.new,
      //     },
      //   ],
      // },

      // Attribute term
      // {
      //   action: Action.READ,
      //   resource: Resource.PRODUCT,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('term.navTitle'),
      //   path: PATH_DASHBOARD.product_attribute_term.root,
      //   icon: ICONS.term,
      //   children: [
      //     {
      //       title: i18n.t('term.list.navListTitle'),
      //       path: PATH_DASHBOARD.product_attribute_term.list,
      //     },
      //     {
      //       title: i18n.t('term.new.navNewTitle'),
      //       path: PATH_DASHBOARD.product_attribute_term.new,
      //     },
      //   ],
      // },

      // Another product
      // {
      //   action: Action.READ,
      //   resource: Resource.PRODUCT,
      //   actionAbility: ActionAbility.CAN,
      //   title: 'Biến thể sản phẩm',
      //   path: PATH_DASHBOARD.product_variant.root,
      //   icon: ICONS.variant,
      //   children: [
      //     {
      //       title: 'Danh sách biến thể',
      //       path: PATH_DASHBOARD.product_variant.list,
      //     },
      //     {
      //       title: 'Thêm mới biến thể',
      //       path: PATH_DASHBOARD.product_variant.new,
      //     },
      //   ],
      // },

      // product
      // {
      //   action: Action.READ,
      //   resource: Resource.PRODUCT,
      //   actionAbility: ActionAbility.CAN,
      //   title: `${vn.ListProduct.titleProductNavbar}`,
      //   path: PATH_DASHBOARD.product.root,
      //   icon: ICONS.product,
      //   children: [
      //     {
      //       title: `${vn.ListProduct.listTitleNavbar}`,
      //       path: PATH_DASHBOARD.product.list,
      //     },
      //     {
      //       title: i18n.t('productMerchant.new.newTitleNavbar'),
      //       path: PATH_DASHBOARD.product.new,
      //     },
      //   ],
      // },

      // manage order
      // {
      //   action: Action.READ,
      //   resource: Resource.ORDER,
      //   actionAbility: ActionAbility.CAN,
      //   title: `${vn.ListOrder.titleOrderNavbar}`,
      //   path: PATH_DASHBOARD.order_management.root,
      //   icon: ICONS.giftOrder,
      //   children: [
      //     {
      //       title: `${vn.ListOrder.listTitleNavbar}`,
      //       path: PATH_DASHBOARD.order_management.list_physical,
      //     },
      //     {
      //       title: `${vn.ListOrder.listVoucher}`,
      //       path: PATH_DASHBOARD.order_management.list_voucher,
      //     },
      //     {
      //       title: i18n.t('order.detail.refundForm.list'),
      //       path: PATH_DASHBOARD.order_management.list_refund,
      //     },
      //     {
      //       title: i18n.t('order.detail.refundRequest.list'),
      //       path: PATH_DASHBOARD.order_management.list_refund_request,
      //     },
      //   ],
      // },

      // Manage store
      // {
      //   action: Action.READ,
      //   resource: Resource.REFERRAL,
      //   title: i18n.t('manage_store_title'),
      //   path: PATH_DASHBOARD.manageStore.root,
      //   icon: ICONS.store,
      //   children: [
      //     {
      //       title: i18n.t('manage_store.listStore'),
      //       path: PATH_DASHBOARD.manageStore.list,
      //     },
      //     {
      //       title: i18n.t('manage_store.createStore'),
      //       path: PATH_DASHBOARD.manageStore.create,
      //     },
      //   ],
      // },

      // Home configuration
      // {
      //   action: Action.READ,
      //   icon: ICONS.homeSetting,
      //   resource: Resource.SYSTEM_CONFIG,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('homeConfig'),
      //   path: PATH_DASHBOARD.homeConfig.root,
      // },

      // Config Share app
      // {
      //   action: Action.READ,
      //   icon: ICONS.homeSetting,
      //   resource: Resource.SYSTEM_CONFIG,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('configShareApp.root'),
      //   path: PATH_DASHBOARD.configShareApp.root,
      // },

      // config accumulate points
      // {
      //   action: Action.READ,
      //   resource: Resource.SYSTEM_CONFIG_POINT,
      //   actionAbility: ActionAbility.CAN,
      //   title: 'Cấu hình tích điểm',
      //   path: PATH_DASHBOARD.point.root,
      //   icon: ICONS.point,
      //   children: [
      //     { title: 'Danh sách cấu hình', path: PATH_DASHBOARD.point.list },
      //     { title: 'Thêm mới cấu hình', path: PATH_DASHBOARD.point.new },
      //   ],
      // },

      // Manage survey
      // {
      //   action: Action.READ,
      //   resource: Resource.SURVEY,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('survey.root'),
      //   path: PATH_DASHBOARD.survey.root,
      //   icon: ICONS.survey,
      //   children: [
      //     {
      //       title: i18n.t('survey.list'),
      //       path: PATH_DASHBOARD.survey.list,
      //     },
      //     {
      //       title: i18n.t('survey.create.title'),
      //       path: PATH_DASHBOARD.survey.create,
      //     },
      //   ],
      // },

      // manage request
      // {
      //   action: Action.READ,
      //   resource: Resource.FILE_REQUEST,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('requestManagement.root'),
      //   path: PATH_DASHBOARD.requestManage.root,
      //   icon: ICONS.order,
      //   children: [
      //     {
      //       title: i18n.t('requestManagement.list'),
      //       path: PATH_DASHBOARD.requestManage.list,
      //     },
      //     {
      //       title: i18n.t('requestManagement.historyDownload.title'),
      //       path: PATH_DASHBOARD.requestManage.listDownload,
      //     },
      //     {
      //       title: i18n.t('requestManagement.listQR'),
      //       path: PATH_DASHBOARD.requestManage.listQR,
      //     },
      //   ],
      // },

      // group policy
      // {
      //   action: Action.READ,
      //   resource: Resource.GROUP_POLICY,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('group_policy.root'),
      //   path: PATH_DASHBOARD.groupPolicy.root,
      //   icon: ICONS.policy,
      //   children: [
      //     {
      //       title: i18n.t('list'),
      //       path: PATH_DASHBOARD.groupPolicy.list,
      //     },
      //     {
      //       title: i18n.t('create'),
      //       path: PATH_DASHBOARD.groupPolicy.create,
      //     },
      //   ],
      // },

      // manage popup
      // {
      //   action: Action.READ,
      //   resource: Resource.SYSTEM_CONFIG,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('popupManage.root'),
      //   path: PATH_DASHBOARD.popupManage.root,
      //   icon: ICONS.popup,
      //   children: [
      //     {
      //       title: i18n.t('popupManage.list.title'),
      //       path: PATH_DASHBOARD.popupManage.list,
      //     },
      //     {
      //       title: i18n.t('popupManage.list.createButton'),
      //       path: PATH_DASHBOARD.popupManage.create,
      //     },
      //   ],
      // },

      // manage feedback
      {
        action: Action.READ,
        resource: Resource.FEEDBACK_ANSWER,
        actionAbility: ActionAbility.CAN,
        title: i18n.t('feedbackManage.root'),
        path: PATH_DASHBOARD.feedbackManage.root,
        icon: ICONS.feedback,
        children: [
          {
            title: i18n.t('feedbackManage.list.title'),
            path: PATH_DASHBOARD.feedbackManage.list,
          },
        ],
      },

      // Manage Admin
      // {
      //   action: Action.READ,
      //   resource: Resource.AGENT,
      //   actionAbility: ActionAbility.CAN,
      //   title: i18n.t('manageAgent.navTitle'),
      //   path: PATH_DASHBOARD.manageAgent.root,
      //   icon: ICONS.manageAgent,
      //   children: [
      //     {
      //       title: i18n.t('manageAgent.list.title'),
      //       path: PATH_DASHBOARD.manageAgent.list,
      //     },
      //     {
      //       title: 'Thêm mới Admin',
      //       path: PATH_DASHBOARD.manageAgent.new,
      //     },
      //   ],
      // },

      // manage index
      // {
      //   action: Action.READ,
      //   resource: Resource.TIER_CONFIG,
      //   title: i18n.t('tierRankManage.root'),
      //   path: PATH_DASHBOARD.tierRankManage.root,
      //   icon: ICONS.tierRank,
      //   children: [
      //     {
      //       title: i18n.t('tierRankManage.list.title'),
      //       path: PATH_DASHBOARD.tierRankManage.list,
      //     },
      //   ],
      // },

      // manage game
      // {
      //   action: Action.READ,
      //   resource: Resource.GAME,
      //   title: i18n.t('gameManage.root'),
      //   path: PATH_DASHBOARD.gameManage.root,
      //   icon: ICONS.game,
      //   children: [
      //     {
      //       title: i18n.t('gameManage.list.title'),
      //       path: PATH_DASHBOARD.gameManage.list,
      //     },
      //     {
      //       title: i18n.t('gameManage.list.createButton'),
      //       path: PATH_DASHBOARD.gameManage.create,
      //     },
      //     {
      //       title: i18n.t('gameManage.win_history.title'),
      //       path: PATH_DASHBOARD.gameManage.winHistory,
      //     },
      //   ],
      // },

      // config game
      // {
      //   title: i18n.t('configPlayTime.root'),
      //   path: PATH_DASHBOARD.configPlayTime.root,
      //   icon: ICONS.game,
      //   children: [
      //     {
      //       title: i18n.t('configPlayTime.list.title'),
      //       path: PATH_DASHBOARD.configPlayTime.list,
      //     },
      //     {
      //       title: i18n.t('configPlayTime.create.title'),
      //       path: PATH_DASHBOARD.configPlayTime.create,
      //     },
      //   ],
      // },

      // manage notification
      {
        action: Action.READ,
        resource: Resource.SYSTEM_CONFIG,
        title: i18n.t('notificationManage.root'),
        path: PATH_DASHBOARD.notificationManage.root,
        icon: ICONS.notification,
        children: [
          {
            title: i18n.t('notificationManage.list.title'),
            path: PATH_DASHBOARD.notificationManage.list,
          },
          {
            title: i18n.t('notificationManage.list.createButton'),
            path: PATH_DASHBOARD.notificationManage.create,
          },
        ],
      },

      // import - export file
      {
        action: Action.READ,
        resource: Resource.IMPORT || Resource.EXPORT,
        title: i18n.t('fileList.title'),
        path: PATH_DASHBOARD.fileManage.root,
        icon: ICONS.invoice,
        children: [
          {
            title: i18n.t('request_export'),
            path: PATH_DASHBOARD.fileManage.listFileExport,
          },
          {
            title: i18n.t('fileList.importFileList'),
            path: PATH_DASHBOARD.fileManage.listFileImport,
          },
        ],
      },

      // News
      {
        action: Action.READ,
        resource: Resource.NEWS,
        actionAbility: ActionAbility.CAN,
        title: 'Tin tức',
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.news,
        children: [
          {
            title: 'Danh sách tin tức',
            path: PATH_DASHBOARD.news.list,
          },
          {
            title: 'Thêm mới tin tức',
            path: PATH_DASHBOARD.news.new,
          },
        ],
      },

      // Topic
      // {
      //   action: Action.READ,
      //   resource: Resource.SUBJECT,
      //   actionAbility: ActionAbility.CAN,
      //   title: 'Chủ đề',
      //   path: PATH_DASHBOARD.news_subject.root,
      //   icon: ICONS.subject,
      //   children: [
      //     {
      //       title: 'Danh sách chủ đề',
      //       path: PATH_DASHBOARD.news_subject.list,
      //     },
      //     {
      //       title: 'Thêm mới chủ đề',
      //       path: PATH_DASHBOARD.news_subject.new,
      //     },
      //   ],
      // },

      // Policy
      {
        action: Action.READ,
        resource: Resource.TERMS_POLICY,
        title: i18n.t('termPolicy.root'),
        path: PATH_DASHBOARD.termPolicy.root,
        icon: ICONS.policy,
        children: [
          {
            title: i18n.t('list'),
            path: PATH_DASHBOARD.termPolicy.list,
          },
          {
            title: i18n.t('create'),
            path: PATH_DASHBOARD.termPolicy.create,
          },
        ],
      },

      // History scan
      // {
      //   action: Action.READ,
      //   resource: Resource.SCAN_HISTORY,
      //   title: i18n.t('historyScan.title'),
      //   path: PATH_DASHBOARD.historyScan.root,
      //   icon: ICONS.historyScan,
      //   children: [
      //     {
      //       title: i18n.t('historyScan.list'),
      //       path: PATH_DASHBOARD.historyScan.list,
      //     },
      //     {
      //       title: i18n.t('historyScan.listDuplicate'),
      //       path: PATH_DASHBOARD.historyScan.list_duplicate,
      //     },
      //   ],
      // },
    ],
  },
];

export default navConfig;
