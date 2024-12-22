import { editOrder } from './../../order-management/edit-order/service';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import eventReducer from '../../event/common/slice';
import historyReducer from 'src/winning-history/history.slice';
import registerReducer from 'src/auth/register/register.slice';
import codeReducer from 'src/code-manage/code-common/code.slice';
import { reducer as configWheelReducer } from '../../config-wheel/config-wheel-create/reducer';
import merchantProfileReducer from 'src/profile/common/reducers/merchant-profile.slice';
import giftReducer from '../../gift/common/gift.slice';
import { reducer as wheelReducer } from 'src/config-wheel/spinning-wheel/reducer';
import { reducer as editWheelReducer } from 'src/config-wheel/config-wheel-edit/reducer';
import productAttributeReducer from 'src/product-attribute-merchant/product-attribute-list/product-attribute.slice';
import postProductAttributeReducer from 'src/product-attribute-merchant/product-attribute-create/product-attribute.slice';
import detailProductReducer from '../../product-merchant/product-detail/slice';
import listProductReducer from '../../product-merchant/product-list/product-slice';
import editProductReducer from '../../product-merchant/product-edit/slice';
import newAttributeTermReducer from '../../product-attribute-term-merchant/term-new/slice';
import editAttributeTermReducer from '../../product-attribute-term-merchant/term-edit/slice';
import newProductReducer from '../../product-merchant/product-new/slice';
import listOrderReducer from '../../order-management/list-physical/slice';
import ConfigFeatureReducer from '../../config-off-checkout/config-feature-list/config-feature-slice';
import ConfigEventReducer from '../../config-event/config-feature-list/config-event-slice';

import requestReducer from 'src/request-management/request-list/list-slice';
import { reducer as homeConfigurationReducer } from 'src/config-home/slice';
import pointListReducer from '../../config-point/list-point/slice';
import requestManageReducer from '../../request-management/requestManage.slice';
import qrCodeReducer from '../../request-management/list-qr/qrCode.slice';
import commonReducer from '../../product-merchant/product-common/slice';
import groupPolicySliceReducer from '../../group-policy/common/group-policy.slice';

import surveySliceReducer from '../../survey/common/survey.slice';
import listAgentReducer from '../../manage-agent/list-agent/slice';
import newAgentReducer from '../../manage-agent/new-agent/slice';
import downloadHistoryReducer from '../../request-management/download-history-list/slice';
import popupReducer from '../../popup-manage/slice';
import feedbackReducer from '../../feedback/slice';
import chartReducer from '../../analytics/slice';

import tierRankReducer from '../../tier-rank-manage/slice';
import userManageReducer from '../../user-management/userManage.slice';
import detailOrderReducer from '../../order-management/detail-order/slice';
import newVariantReducer from '../../product-variant/new-variant/slice';
import tagListReducer from '../../tag/tag-list/tag.slice';
import storeInMapListReducer from '../../store-in-map/store-list/storeInMap.slice';
import categoryManageReducer from '../../name_child/common/category.slice';
import groupUserReducer from '../../user-management/groupUser-manage/groupUser.slices';
import manageStoreReducer from '../../manage-store/manageStore.slice';
import listTermReducer from '../../product-attribute-term-merchant/term-list/slice';
import listVariantReducer from '../../product-variant/list-variant/slice';
import editVariantReducer from '../../product-variant/edit-variant/slice';
import notiReducer from '../../noti-manage/slice';
import termsPolicySliceReducer from '../../terms-policy/common/terms-policy.slice';
import listNewsReducer from '../../news/news-list/slice';
import listNewsSubjectReducer from '../../news-subject/subject-list/slice';
import historyScanReducer from '../../history-scan/historyScan.slice';
import listVoucherReducer from '../../order-management/list-voucher/slice';
import historyGiftReducer from '../../user-management/view-user/components/historyGiftUser/common/historyGift.slice';
import editOrderReducer from '../../order-management/edit-order/slice';
import configRuleReducer from '../../rule-manage/rule.slice';
import refundedOrderReducer from '../../order-management/list-refund/refunded.slice';
import refundOrderRequestReducer from '../../order-management/list-request-refund/slice';
import gameGiftReducer from '../../game-gift/gameGift.slice';
import listGameWinHistoryReducer from '../../game-manage/game-win-history/slice';

import configPlayTimeReducer from '../../config-game-play-time/common/slice';
import configAppReducer from '../../config-app/configApp.slice';
import statisticPointReducer from '../../analytics/analytics-point/statisticPoint.slice';
import statisticSpoonUnusedReducer from '../../analytics/analytics-spoon-unused/statisticSpoonUnused.slice';
import statisticSpoonUsedReducer from '../../analytics/analytics-spoon-used/statisticSpoonUsed.slice';

import statisticScanReducer from '../../analytics/analytic-scan/statisticScan.slice';
import configShareAppReducer from '../../config-share-app/slice';

// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin', 'login', 'merchantProfile'],
};

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  login: loginReducer,
  event: eventReducer,
  historyWinning: historyReducer,
  register: registerReducer,
  configWheelReducer,
  codeRelease: codeReducer,
  merchantProfile: merchantProfileReducer,
  gift: giftReducer,
  wheelReducer,
  editWheelReducer,
  popup: popupReducer,
  feedback: feedbackReducer,
  chart: chartReducer,
  tierRank: tierRankReducer,
  noti: notiReducer,
  productAttribute: productAttributeReducer,
  postProductAttribute: postProductAttributeReducer,
  detailProduct: detailProductReducer,
  listProduct: listProductReducer,
  configFeature: ConfigFeatureReducer,
  configEvent: ConfigEventReducer,
  editProduct: editProductReducer,
  // attribute-term
  newAttributeTerm: newAttributeTermReducer,
  editAttributeTerm: editAttributeTermReducer,
  listTerm: listTermReducer,
  newProduct: newProductReducer,
  request: requestReducer,
  listOrder: listOrderReducer,
  listVoucher: listVoucherReducer,
  homeConfigurationReducer,
  pointList: pointListReducer,
  survey: surveySliceReducer,
  qrCode: qrCodeReducer,
  requestManage: requestManageReducer,
  commonProduct: commonReducer,
  listAgent: listAgentReducer,
  newAgent: newAgentReducer,
  downloadHistory: downloadHistoryReducer,
  groupPolicy: groupPolicySliceReducer,
  userManage: userManageReducer,
  detailOrder: detailOrderReducer,
  newVariant: newVariantReducer,
  tagList: tagListReducer,
  categoryManage: categoryManageReducer,
  manageStore: manageStoreReducer,
  listVariant: listVariantReducer,
  editVariant: editVariantReducer,
  groupUserManage: groupUserReducer,
  termsPolicy: termsPolicySliceReducer,
  listNews: listNewsReducer,
  listNewsSubject: listNewsSubjectReducer,
  historyScan: historyScanReducer,
  historyGift: historyGiftReducer,
  editOrder: editOrderReducer,
  configRule: configRuleReducer,
  refundedOrder: refundedOrderReducer,
  refundOrderRequest: refundOrderRequestReducer,
  storeInMap: storeInMapListReducer,
  gameGiftManage: gameGiftReducer,
  configPlayTime: configPlayTimeReducer,
  configApp: configAppReducer,
  listGameWinHistory: listGameWinHistoryReducer,
  statisticPoint: statisticPointReducer,
  statisticSpoonUnused: statisticSpoonUnusedReducer,
  statisticSpoonUsed: statisticSpoonUsedReducer,
  statisticScan: statisticScanReducer,
  configShareApp: configShareAppReducer,
});

export { rootPersistConfig, rootReducer };
