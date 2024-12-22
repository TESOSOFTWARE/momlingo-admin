import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// config
// components
import LoadingScreen from '../components/LoadingScreen';
import HistoryList from 'src/winning-history/pages/HistoryList';
import { PATH_AUTH, PATH_DASHBOARD } from './paths';
import TagList from '../../tag/tag-list';
import EditTag from '../../tag/tag-edit';
import { ListStoreContainer } from '../../manage-store/list-store';
import { CreateStoreContainer } from '../../manage-store/create-store';
import { EditStoreContainer } from '../../manage-store/edit-store';
import { DetailStoreContainer } from '../../manage-store/detail-store';
import { RequestExportListContainer } from '../../request-export/request-export-list';
import BannerEdit from '../../config-home/components/banners-section/BannerEdit';
import NormalServiceEdit from '../../config-home/components/normal-services-section/NormalServiceEdit';
import HorizontalProductEdit from '../../config-home/components/horizontal-products';
import StoreList from '../../store-in-map/store-list/StoreList';
import StoreNew from '../../store-in-map/store-new/StoreNew';
import StoreEdit from '../../store-in-map/store-edit/StoreEdit';
import EditShareAppBanner from '../../config-share-app/components/BannerEdit';
import NewBabyTrackerPage from '../../config-off-checkout/new-baby-tracker';
import EditChildTracker from '../../rule-manage/detail-child-tracker';
import NewChildTracker from '../../rule-manage/new-child-tracker';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: PATH_AUTH.emailConfirmation,
          element: <EmailConfirmation />,
        },
        {
          path: PATH_AUTH.approvedNotification,
          element: <ApprovedNotification />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'event',
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.event.list} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.event.list,
              element: <EventList />,
            },
            {
              path: PATH_DASHBOARD.event.create,
              element: <EventCreate />,
            },
            {
              path: 'edit/:id',
              element: <EventEdit />,
            },
          ],
        },
        {
          path: 'winning-history',
          element: <HistoryList />,
        },
        {
          path: 'merchant',
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.merchant.root} replace />,
              index: true,
            },
            { path: 'settings', element: <AccountGeneral /> },
            { path: 'change-password', element: <AccountChangePassword /> },
          ],
        },
        {
          path: 'code',
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.code.root} replace />,
              index: true,
            },
            { path: 'list', element: <CodeList /> },
            { path: 'edit/:code', element: <CodeEdit /> },
            { path: 'create', element: <CodeCreate /> },
          ],
        },
        {
          path: PATH_DASHBOARD.gift.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.gift.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.gift.list, element: <GiftList /> },
            { path: PATH_DASHBOARD.gift.create, element: <GiftCreate /> },
          ],
        },
        {
          path: PATH_DASHBOARD.configWheel.create,
          element: <ConfigWheelContainer />,
        },
        {
          path: PATH_DASHBOARD.configFeature.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.configFeature.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.configFeature.edit.babyTracker,
              element: <EditBabyTracker />,
            },
            {
              path: PATH_DASHBOARD.configFeature.new.babyTracker,
              element: <NewBabyTrackerPage />,
            },
            { path: PATH_DASHBOARD.configFeature.list, element: <ConfigFeatureList /> },
          ],
        },
        {
          path: PATH_DASHBOARD.configEvent.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.configEvent.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.configEvent.list, element: <ConfigEventList /> },
          ],
        },
        {
          path: PATH_DASHBOARD.event.edit,
          element: <EditWheelContainer />,
        },
        {
          path: PATH_DASHBOARD.product.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.product.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.product.list, element: <ProductList /> },
            { path: PATH_DASHBOARD.product.new, element: <ProductNew /> },
            { path: PATH_DASHBOARD.product.detail, element: <ProductDetail /> },
            { path: PATH_DASHBOARD.product.edit, element: <ProductEdit /> },
          ],
        },
        {
          path: PATH_DASHBOARD.product_attribute.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.product_attribute.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.product_attribute.list,
              element: <ProductAttributeList />,
            },
            {
              path: PATH_DASHBOARD.product_attribute.edit,
              element: <IndexAttributeEdit />,
            },
            {
              path: PATH_DASHBOARD.product_attribute.new,
              element: <ProductAttributeCreate />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.product_attribute_term.root,
          children: [
            {
              element: (
                <Navigate to={PATH_DASHBOARD.product_attribute_term.root} replace />
              ),
              index: true,
            },
            {
              path: PATH_DASHBOARD.product_attribute_term.list,
              element: <ListIndex />,
            },
            {
              path: PATH_DASHBOARD.product_attribute_term.new,
              element: <NewIndex />,
            },
            {
              path: PATH_DASHBOARD.product_attribute_term.edit,
              element: <EditIndex />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.product_variant.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.product_variant.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.product_variant.list,
              element: <ListVariant />,
            },
            {
              path: PATH_DASHBOARD.product_variant.new,
              element: <NewVariant />,
            },
            {
              path: PATH_DASHBOARD.product_variant.edit,
              element: <EditVariant />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.order_management.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.order_management.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.order_management.list_physical,
              element: <IndexListOrder />,
            },
            {
              path: PATH_DASHBOARD.order_management.list_voucher,
              element: <IndexListVoucherOrder />,
            },
            {
              path: PATH_DASHBOARD.order_management.detail,
              element: <IndexDetailOrder />,
            },
            {
              path: PATH_DASHBOARD.order_management.detailProd,
              element: <ProductDetailEVoucher />,
            },
            {
              path: PATH_DASHBOARD.order_management.edit,
              element: <IndexEditOrder />,
            },
            {
              path: PATH_DASHBOARD.order_management.list_refund,
              element: <ListOrderRefund />,
            },
            {
              path: 'refund-detail/:id',
              element: <DetailOrderRefund />,
            },
            {
              path: PATH_DASHBOARD.order_management.list_refund_request,
              element: <ListOrderRefundRequest />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.homeConfig.root,
          children: [
            {
              element: <EditHomeConfig />,
              index: true,
            },
            {
              path: 'edit-banner/:id',
              element: <BannerEdit />,
            },
            {
              path: 'edit-normal-service/:id',
              element: <NormalServiceEdit />,
            },
            {
              path: 'edit-horizontal-product/:type/:id',
              element: <HorizontalProductEdit />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.configShareApp.root,
          children: [
            {
              element: <EditConfigShareApp />,
              index: true,
            },
            {
              path: 'edit-banner/:id',
              element: <EditShareAppBanner />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.point.root,
          children: [
            { path: PATH_DASHBOARD.point.list, element: <PointList /> },
            { path: PATH_DASHBOARD.point.new, element: <PointNew /> },
            { path: PATH_DASHBOARD.point.edit, element: <PointEdit /> },
          ],
        },
        {
          path: PATH_DASHBOARD.survey.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.survey.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.survey.list,
              element: <ListSurveys />,
            },
            {
              path: PATH_DASHBOARD.survey.create,
              element: <SurveyCreate />,
            },
            {
              path: `edit/:id`,
              element: <SurveyEdit />,
            },
            {
              path: `:id`,
              element: <SurveyView />,
            },
            {
              path: `survey-history/:surveyId/detail/:userId`,
              element: <DetailUserSurvey />,
            },
            {
              path: 'survey-history/:id',
              element: <ListUsersSurvey />,
            },
          ],
        },
        // Request
        {
          path: PATH_DASHBOARD.requestManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.requestManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.requestManage.list,
              element: <RequestList />,
            },
            {
              path: PATH_DASHBOARD.requestManage.listDownload,
              element: <DownloadHistoryList />,
            },
            {
              path: PATH_DASHBOARD.requestManage.listQR,
              element: <ListQRCode />,
            },
            {
              path: PATH_DASHBOARD.requestManage.createSpoon,
              element: <CreateSPOON />,
            },
            {
              path: PATH_DASHBOARD.requestManage.createSBPS,
              element: <CreateSBPS />,
            },
            { path: 'detail/:fileId', element: <RequestDetail /> },
          ],
        },
        // Popup
        {
          path: PATH_DASHBOARD.popupManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.popupManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.popupManage.list,
              element: <PopupList />,
            },
            {
              path: PATH_DASHBOARD.popupManage.create,
              element: <PopupCreate />,
            },
            {
              path: 'edit/:id',
              element: <PopupEdit />,
            },
          ],
        },
        // Feedback
        {
          path: PATH_DASHBOARD.feedbackManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.feedbackManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.feedbackManage.list,
              element: <FeedbackList />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.chartManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.chartManage.order} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.chartManage.order,
              element: <ChartOrder />,
            },
            {
              path: PATH_DASHBOARD.chartManage.game,
              element: <ChartGame />,
            },
          ],
        },
        // Manage-agent
        {
          path: PATH_DASHBOARD.manageAgent.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.manageAgent.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.manageAgent.list,
              element: <ListAgent />,
            },
            {
              path: PATH_DASHBOARD.manageAgent.new,
              element: <NewAgent />,
            },
            {
              path: PATH_DASHBOARD.manageAgent.edit,
              element: <EditAgent />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.groupPolicy.root,
          children: [
            {
              path: PATH_DASHBOARD.groupPolicy.list,
              element: <GroupPolicyList />,
            },
            {
              path: PATH_DASHBOARD.groupPolicy.create,
              element: <GroupPolicyCreate />,
            },
            {
              path: PATH_DASHBOARD.groupPolicy.edit,
              element: <GroupPolicyEdit />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.userManagement.root,
          children: [
            {
              path: PATH_DASHBOARD.userManagement.list,
              element: <UserList />,
            },
            {
              path: 'detail/:id',
              element: <UserDetail />,
            },
            {
              path: 'edit/:id',
              element: <EditUser />,
            },
            {
              path: PATH_DASHBOARD.userManagement.listGroupUser,
              element: <ListGroupUser />,
            },
            {
              path: PATH_DASHBOARD.userManagement.createGroupUser,
              element: <CreateGroupUser />,
            },
            {
              path: 'edit-group-user/:id',
              element: <EditGroupUser />,
            },
            {
              path: PATH_DASHBOARD.userManagement.listIntroduceUser,
              element: <ListIntroduceUser />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.category.root,
          children: [
            {
              path: PATH_DASHBOARD.category.new,
              element: <NewCategory />,
            },
            {
              path: PATH_DASHBOARD.category.list,
              element: <ListCategory />,
            },
            {
              path: 'edit/:id',
              element: <EditCategory />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.musicTool.root,
          children: [
            {
              path: PATH_DASHBOARD.musicTool.new,
              element: <NewMusicTool />,
            },
            {
              path: PATH_DASHBOARD.musicTool.list,
              element: <ListMusicTool />,
            },
            {
              path: 'edit/:id',
              element: <EditMusicTool />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.tag.root,
          children: [
            {
              path: PATH_DASHBOARD.tag.list,
              element: <TagList />,
            },
            {
              path: PATH_DASHBOARD.tag.new,
              element: <NewTag />,
            },
            {
              path: PATH_DASHBOARD.tag.edit,
              element: <EditTag />,
            },
          ],
        },
        // store in map
        {
          path: PATH_DASHBOARD.storeInMap.root,
          children: [
            {
              path: PATH_DASHBOARD.storeInMap.list,
              element: <StoreList />,
            },
            {
              path: PATH_DASHBOARD.storeInMap.new,
              element: <StoreNew />,
            },
            {
              path: PATH_DASHBOARD.storeInMap.edit,
              element: <StoreEdit />,
            },
          ],
        },
        // Tier rank
        {
          path: PATH_DASHBOARD.tierRankManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.tierRankManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.tierRankManage.list,
              element: <TierRankList />,
            },
            {
              path: PATH_DASHBOARD.tierRankManage.create,
              element: <TierRankCreate />,
            },
            {
              path: 'edit/:id',
              element: <TierRankEdit />,
            },
          ],
        },
        // Game
        {
          path: PATH_DASHBOARD.gameManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.gameManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.gameManage.list,
              element: <GameList />,
            },
            {
              path: PATH_DASHBOARD.gameManage.create,
              element: <GameCreate />,
            },
            {
              path: 'edit/:id',
              element: <GameEdit />,
            },
            {
              path: PATH_DASHBOARD.gameManage.winHistory,
              element: <GameWinHistory />,
            },
          ],
        },
        // notifaction
        {
          path: PATH_DASHBOARD.notificationManage.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.notificationManage.root} replace />,
              index: true,
            },
            {
              path: PATH_DASHBOARD.notificationManage.list,
              element: <NotificationList />,
            },
            {
              path: PATH_DASHBOARD.notificationManage.create,
              element: <NotificationCreate />,
            },
            {
              path: 'edit/:id',
              element: <NotificationEdit />,
            },
          ],
        },
        // Manage Store
        {
          path: PATH_DASHBOARD.manageStore.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.manageStore.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.manageStore.list, element: <ListStoreContainer /> },
            {
              path: PATH_DASHBOARD.manageStore.create,
              element: <CreateStoreContainer />,
            },
            {
              path: PATH_DASHBOARD.manageStore.edit,
              element: <EditStoreContainer />,
            },
            {
              path: PATH_DASHBOARD.manageStore.detail,
              element: <DetailStoreContainer />,
            },
          ],
        },
        // termPolicy-manage
        {
          path: PATH_DASHBOARD.termPolicy.root,
          children: [
            {
              path: PATH_DASHBOARD.termPolicy.list,
              element: <PolicyList />,
            },
            {
              path: PATH_DASHBOARD.termPolicy.create,
              element: <PolicyCreate />,
            },
            {
              path: 'view/:id',
              element: <PolicyView />,
            },
            {
              path: 'edit/:id',
              element: <PolicyEdit />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.historyScan.root,
          children: [
            {
              path: PATH_DASHBOARD.historyScan.list,
              element: <HistoryScanList />,
            },
            {
              path: PATH_DASHBOARD.historyScan.list_duplicate,
              element: <DuplicateScanList />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.fileManage.root,
          children: [
            {
              path: PATH_DASHBOARD.fileManage.listFileExport,
              element: <RequestExportListContainer />,
            },
            {
              path: PATH_DASHBOARD.fileManage.listFileImport,
              element: <ImportFileList />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.news.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.news.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.news.list, element: <NewsList /> },
            { path: PATH_DASHBOARD.news.new, element: <NewsNew /> },
            { path: PATH_DASHBOARD.news.detail, element: <NewsDetail /> },
            { path: PATH_DASHBOARD.news.edit, element: <NewsEdit /> },
          ],
        },
        {
          path: PATH_DASHBOARD.news_subject.root,
          children: [
            {
              element: <Navigate to={PATH_DASHBOARD.news.root} replace />,
              index: true,
            },
            { path: PATH_DASHBOARD.news_subject.list, element: <NewsSubjectList /> },
            { path: PATH_DASHBOARD.news_subject.new, element: <NewsSubjectNew /> },
            { path: PATH_DASHBOARD.news_subject.edit, element: <NewsSubjectEdit /> },
          ],
        },
        {
          path: PATH_DASHBOARD.ruleManage.root,
          children: [
            {
              path: PATH_DASHBOARD.ruleManage.list,
              element: <RuleManageList />,
            },
            {
              path: PATH_DASHBOARD.configFeature.edit.childTracker,
              element: <EditChildTracker />,
            },
            {
              path: PATH_DASHBOARD.configFeature.new.childTracker,
              element: <NewChildTracker />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.gameGift.root,
          children: [
            {
              path: ':id/game-gift/list',
              element: <GameGiftList />,
            },
            {
              path: ':gameId/game-gift/:giftId/edit',
              element: <EditGameGift />,
            },
            {
              path: ':gameId/game-gift/create',
              element: <CreateGameGift />,
            },
            {
              path: ':gameId/game-gift/:giftId',
              element: <ViewGameGift />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.configPlayTime.root,
          children: [
            {
              path: PATH_DASHBOARD.configPlayTime.list,
              element: <ConfigPlaytimeList />,
            },
            {
              path: PATH_DASHBOARD.configPlayTime.create,
              element: <CreateConfigPlayTime />,
            },
            {
              path: PATH_DASHBOARD.configPlayTime.edit,
              element: <EditConfigPlayTime />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.configApp.root,
          children: [
            {
              path: PATH_DASHBOARD.configApp.list,
              element: <ConfigAppList />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.analyticsApp.root,
          children: [
            {
              path: PATH_DASHBOARD.analyticsApp.listChart,
              element: <AnalystAppList />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.chartManage.root,
          children: [
            {
              path: PATH_DASHBOARD.chartManage.order,
              element: <ChartOrder />,
            },
            {
              path: PATH_DASHBOARD.chartManage.game,
              element: <ChartGame />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.analyticsPoint.root,
          children: [
            {
              path: PATH_DASHBOARD.analyticsPoint.listChart,
              element: <AnalystPoint />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.analyticsSpoonUsed.root,
          children: [
            {
              path: PATH_DASHBOARD.analyticsSpoonUsed.listChart,
              element: <AnalystSpoonUsed />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.analyticsSpoonUnused.root,
          children: [
            {
              path: PATH_DASHBOARD.analyticsSpoonUnused.listChart,
              element: <AnalystSpoonUnused />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.analyticsScan.root,
          children: [
            {
              path: PATH_DASHBOARD.analyticsScan.listChart,
              element: <AnalystScan />,
            },
          ],
        },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      // root element
      children: [
        {
          path: '',
          element: <RootPage />,
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// login
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const ForgotPassword = Loadable(
  lazy(() => import('../../auth/forgot-password/ResetPassword'))
);
const Register = Loadable(lazy(() => import('../../auth/register/Register')));

// code release
const CodeList = Loadable(lazy(() => import('../../code-manage/code-list/CodeList')));
const CodeEdit = Loadable(lazy(() => import('../../code-manage/code-edit/CodeEdit')));
const CodeCreate = Loadable(
  lazy(() => import('../../code-manage/code-create/CodeCreate'))
);

// store in map
const StoreInMapList = Loadable(
  lazy(() => import('../../store-in-map/store-list/StoreList'))
);
const StoreInMapEdit = Loadable(
  lazy(() => import('../../store-in-map/store-edit/StoreEdit'))
);
const StoreInMapCreate = Loadable(
  lazy(() => import('../../store-in-map/store-new/StoreNew'))
);
// merchant
const AccountGeneral = Loadable(
  lazy(() => import('../../profile/account-general/AccountGeneral'))
);
const AccountChangePassword = Loadable(
  lazy(() => import('../../profile/account-change-password/AccountChangePassword'))
);

// event
const EventList = Loadable(lazy(() => import('../../event/event-list')));
const EventCreate = Loadable(lazy(() => import('../../event/event-create/index')));
const EventEdit = Loadable(lazy(() => import('../../event/event-edit/index')));

// gift
const GiftList = Loadable(lazy(() => import('../../gift/gift-list')));
const GiftCreate = Loadable(lazy(() => import('../../gift/gift-create')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// config wheel
const ConfigWheelContainer = Loadable(
  lazy(() => import('src/config-wheel/config-wheel-create/components/index'))
);

const EditWheelContainer = Loadable(
  lazy(() => import('src/config-wheel/config-wheel-edit/components/index'))
);
// config off checkout
const ConfigFeatureList = Loadable(
  lazy(() => import('../../config-off-checkout/config-feature-list/ListConfigFeature'))
);
// config event
const ConfigEventList = Loadable(
  lazy(() => import('../../config-event/config-feature-list/ListConfigEvent'))
);
// product
const ProductList = Loadable(
  lazy(() => import('../../product-merchant/product-list/ProductList'))
);
const ProductNew = Loadable(
  lazy(() => import('../../product-merchant/product-new/ProductNew'))
);
const ProductDetail = Loadable(
  lazy(() => import('../../product-merchant/product-detail/ProductDetail'))
);
const ProductEdit = Loadable(
  lazy(() => import('../../product-merchant/product-edit/ProductEdit'))
);
const EmailConfirmation = Loadable(
  lazy(() => import('src/email-confirmation/components/index'))
);
const ApprovedNotification = Loadable(
  lazy(() => import('src/approved-notification/components/index'))
);
// Product-attribute-merchant
const ProductAttributeList = Loadable(
  lazy(
    () => import('src/product-attribute-merchant/product-attribute-list/components/index')
  )
);
const ProductAttributeCreate = Loadable(
  lazy(
    () =>
      import('src/product-attribute-merchant/product-attribute-create/components/index')
  )
);
const IndexAttributeEdit = Loadable(
  lazy(
    () =>
      import('src/product-attribute-merchant/product-attribute-edit/IndexAttributeEdit')
  )
);
// Product-attribute-term-merchant
const ListIndex = Loadable(
  lazy(() => import('src/product-attribute-term-merchant/term-list/ListIndex'))
);
const NewIndex = Loadable(
  lazy(() => import('src/product-attribute-term-merchant/term-new/NewIndex'))
);
const EditIndex = Loadable(
  lazy(() => import('src/product-attribute-term-merchant/term-edit/index'))
);

// Product-variant
const ListVariant = Loadable(
  lazy(() => import('src/product-variant/list-variant/ListVariant'))
);
const NewVariant = Loadable(
  lazy(() => import('src/product-variant/new-variant/NewVariant'))
);

// REQUEST MANAGE
const RequestList = Loadable(
  lazy(() => import('src/request-management/request-list/RequestList'))
);
const DownloadHistoryList = Loadable(
  lazy(() => import('src/request-management/download-history-list/DownloadHistoryList'))
);
const RequestDetail = Loadable(
  lazy(() => import('src/request-management/request-detail/RequestDetail'))
);
const EditVariant = Loadable(
  lazy(() => import('src/product-variant/edit-variant/index'))
);

// Order-management
const IndexListOrder = Loadable(
  lazy(() => import('src/order-management/list-physical/IndexListOrder'))
);

const IndexListVoucherOrder = Loadable(
  lazy(() => import('src/order-management/list-voucher/IndexListOrder'))
);
const IndexDetailOrder = Loadable(
  lazy(() => import('src/order-management/detail-order/index'))
);
const IndexEditOrder = Loadable(
  lazy(() => import('src/order-management/edit-order/index'))
);
const ProductDetailEVoucher = Loadable(
  lazy(
    () =>
      import(
        'src/order-management/detail-order/components/DetailFormElement/ProductInfo/ProductDetail'
      )
  )
);

const ListOrderRefund = Loadable(
  lazy(() => import('src/order-management/list-refund/index'))
);
const ListOrderRefundRequest = Loadable(
  lazy(() => import('src/order-management/list-request-refund/index'))
);
const DetailOrderRefund = Loadable(
  lazy(() => import('src/order-management/detail-refund/index'))
);

const EditHomeConfig = Loadable(lazy(() => import('src/config-home/index')));

// point
const PointList = Loadable(lazy(() => import('src/config-point/list-point/index')));
const PointNew = Loadable(lazy(() => import('src/config-point/new-point/index')));
const PointEdit = Loadable(lazy(() => import('src/config-point/edit-point/index')));
// Survey
const SurveyCreate = Loadable(lazy(() => import('src/survey/survey-create/index')));
const SurveyEdit = Loadable(lazy(() => import('src/survey/survey-edit/index')));
const SurveyView = Loadable(lazy(() => import('src/survey/survey-view/index')));
const ListSurveys = Loadable(lazy(() => import('src/survey/survey-list/ListSurveys')));
const DetailUserSurvey = Loadable(
  lazy(() => import('src/survey/user-survey/user-survey-view/index'))
);

// request-management

const CreateSPOON = Loadable(
  lazy(() => import('src/request-management/create-spoon/index'))
);
const CreateSBPS = Loadable(
  lazy(() => import('src/request-management/create-sbps/index'))
);
const ListQRCode = Loadable(lazy(() => import('src/request-management/list-qr/index')));

// popup
const PopupList = Loadable(lazy(() => import('src/popup-manage/popup-list/PopupList')));
const PopupCreate = Loadable(
  lazy(() => import('src/popup-manage/popup-create/PopupCreate'))
);
const PopupEdit = Loadable(lazy(() => import('src/popup-manage/popup-edit/PopupEdit')));

const FeedbackList = Loadable(
  lazy(() => import('src/feedback/feedback-list/FeedbackList'))
);
const ChartOrder = Loadable(
  lazy(() => import('src/analytics/analytic-order/OrderChartPage'))
);
const RootPage = Loadable(lazy(() => import('src/homeApp')));
const ChartGame = Loadable(
  lazy(() => import('src/analytics/analytic-game/GameChartPage'))
);

// tier rank
const TierRankList = Loadable(
  lazy(() => import('src/tier-rank-manage/tier-rank-list/TierRankList'))
);
const TierRankCreate = Loadable(
  lazy(() => import('src/tier-rank-manage/tier-rank-create/TierRankCreate'))
);
const TierRankEdit = Loadable(
  lazy(() => import('src/tier-rank-manage/tier-rank-edit/TierRankEdit'))
);
// game
const GameList = Loadable(lazy(() => import('src/game-manage/game-list/GameList')));
const GameCreate = Loadable(lazy(() => import('src/game-manage/game-create/GameCreate')));
const GameEdit = Loadable(lazy(() => import('src/game-manage/game-edit/GameEdit')));
const GameWinHistory = Loadable(
  lazy(() => import('src/game-manage/game-win-history/index'))
);
// notification
const NotificationList = Loadable(
  lazy(() => import('src/noti-manage/noti-list/NotiList'))
);
const NotificationCreate = Loadable(
  lazy(() => import('src/noti-manage/noti-create/NotiCreate'))
);
const NotificationEdit = Loadable(
  lazy(() => import('src/noti-manage/noti-edit/NotiEdit'))
);
// manage-agent
const ListAgent = Loadable(lazy(() => import('src/manage-agent/list-agent/index')));
const NewAgent = Loadable(lazy(() => import('src/manage-agent/new-agent/index')));
const EditAgent = Loadable(lazy(() => import('src/manage-agent/edit-agent/index')));
// Group Policy

const GroupPolicyList = Loadable(
  lazy(() => import('src/group-policy/group-policy-list/index'))
);
const GroupPolicyCreate = Loadable(
  lazy(() => import('src/group-policy/group-policy-create/index'))
);
const GroupPolicyEdit = Loadable(
  lazy(() => import('src/group-policy/group-policy-edit/index'))
);
// User
const UserList = Loadable(lazy(() => import('src/user-management/list-user/index')));
const UserDetail = Loadable(lazy(() => import('src/user-management/view-user/index')));
const EditUser = Loadable(lazy(() => import('src/user-management/edit-user/index')));

// Category
const NewCategory = Loadable(lazy(() => import('src/name_child/new-category/index')));
const ListCategory = Loadable(lazy(() => import('src/name_child/list-categories/index')));
const EditCategory = Loadable(lazy(() => import('src/name_child/edit-category/index')));
// Music tool
const NewMusicTool = Loadable(lazy(() => import('src/music_tools/new-music-tool')));
const ListMusicTool = Loadable(lazy(() => import('src/music_tools/list-music-tool')));
const EditMusicTool = Loadable(lazy(() => import('src/music_tools/edit-music-tool')));
// Tag
const NewTag = Loadable(lazy(() => import('src/tag/new-tag/index')));
// Group-user
const ListGroupUser = Loadable(
  lazy(() => import('src/user-management/groupUser-manage/list-groupUser/index'))
);
const CreateGroupUser = Loadable(
  lazy(() => import('src/user-management/groupUser-manage/create-groupUser/index'))
);
const EditGroupUser = Loadable(
  lazy(() => import('src/user-management/groupUser-manage/edit-groupUser/index'))
);

const ListIntroduceUser = Loadable(
  lazy(() => import('src/user-management/list-introduce-user/index'))
);

// Users joined survey
const ListUsersSurvey = Loadable(
  lazy(() => import('src/survey/user-survey/user-survey-list/index'))
);

// Term policy
const PolicyList = Loadable(
  lazy(() => import('src/terms-policy/terms-policy-list/index'))
);
const PolicyCreate = Loadable(
  lazy(() => import('src/terms-policy/terms-policy-create/index'))
);
const PolicyView = Loadable(
  lazy(() => import('src/terms-policy/terms-policy-view/index'))
);

const PolicyEdit = Loadable(
  lazy(() => import('src/terms-policy/terms-policy-edit/index'))
);

// file-import
const ImportFileList = Loadable(lazy(() => import('src/requestImport/index')));

// news
const NewsList = Loadable(lazy(() => import('../../news/news-list/index')));
const NewsNew = Loadable(lazy(() => import('../../news/news-new/index')));
const NewsDetail = Loadable(lazy(() => import('../../news/news-detail/index')));
const NewsEdit = Loadable(lazy(() => import('../../news/news-edit/index')));

// news subject
const NewsSubjectList = Loadable(
  lazy(() => import('../../news-subject/subject-list/index'))
);
const NewsSubjectNew = Loadable(
  lazy(() => import('../../news-subject/subject-new/index'))
);
const NewsSubjectEdit = Loadable(
  lazy(() => import('../../news-subject/subject-edit/index'))
);

// history-scan
const HistoryScanList = Loadable(lazy(() => import('src/history-scan/index')));
const DuplicateScanList = Loadable(
  lazy(() => import('src/history-scan/duplicate-scan/index'))
);
// rule-manage
const RuleManageList = Loadable(lazy(() => import('src/rule-manage/index')));

// game-gift
const GameGiftList = Loadable(lazy(() => import('src/game-gift/index')));
const ViewGameGift = Loadable(lazy(() => import('src/game-gift/view-game-gift/index')));
const EditGameGift = Loadable(lazy(() => import('src/game-gift/edit-game-gift/index')));
const CreateGameGift = Loadable(
  lazy(() => import('src/game-gift/create-game-gift/index'))
);
// config-play-time
const ConfigPlaytimeList = Loadable(
  lazy(() => import('src/config-game-play-time/config-list/index'))
);
const CreateConfigPlayTime = Loadable(
  lazy(() => import('src/config-game-play-time/config-create/index'))
);
const EditConfigPlayTime = Loadable(
  lazy(() => import('src/config-game-play-time/config-edit/index'))
);
// config-app
const ConfigAppList = Loadable(lazy(() => import('src/config-app/index')));

// Analytics
const AnalystAppList = Loadable(
  lazy(() => import('src/analytics/analytic-app/list-chart/index'))
);
const AnalystPoint = Loadable(lazy(() => import('src/analytics/analytics-point/index')));
const AnalystSpoonUnused = Loadable(
  lazy(() => import('src/analytics/analytics-spoon-unused/index'))
);
const AnalystSpoonUsed = Loadable(
  lazy(() => import('src/analytics/analytics-spoon-used/index'))
);
const AnalystScan = Loadable(lazy(() => import('src/analytics/analytic-scan/index')));

// config-share-app
const EditConfigShareApp = Loadable(lazy(() => import('src/config-share-app/index')));
// baby tracker
const EditBabyTracker = Loadable(
  lazy(() => import('../../config-off-checkout/detail-baby-tracker'))
);
