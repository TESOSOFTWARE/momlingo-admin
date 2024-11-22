import { Container, Button, Stack } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import FormUserDetail from './components/UserDetail';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  isOpenModalHistoryGiftSelector,
  isOpenModalHistoryScanSelector,
  setIsOpenModalHistoryGift,
  setIsOpenModalHistoryScan,
} from '../userManage.slice';
import { HistoryScanModal } from './components/ModalHistoryScan';
import { HistoryGiftModal } from './components/ModalHistoryGift';
import { useParams } from 'react-router-dom';
import { useGetUserById } from '../hooks/useGetUserById';
import { useEffect } from 'react';

export default function ViewUser() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data, isLoading, refetch } = useGetUserById(Number(id));

  const isOpenHistoryScan = useSelector(isOpenModalHistoryScanSelector);
  const isOpenHistoryGift = useSelector(isOpenModalHistoryGiftSelector);

  const handleViewHistoryScan = () => {
    dispatch(setIsOpenModalHistoryScan(true));
  };
  const handleViewHistoryGift = () => {
    dispatch(setIsOpenModalHistoryGift(true));
  };

  return (
    <Page title={i18n.t('userManage.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('userManage.detail')}
          links={[
            {
              name: `${i18n.t('userManage.title')}`,
              href: PATH_DASHBOARD.userManagement.list,
            },
            {
              name: `${i18n.t('userManage.detail')}`,
              href: '',
            },
          ]}
          action={
            <Stack spacing={2} direction={'row'}>
              <Button variant="contained" onClick={() => handleViewHistoryScan()}>
                {t('userManage.viewHistoryAddPoint')}
              </Button>
              <Button variant="contained" onClick={() => handleViewHistoryGift()}>
                {t('userManage.viewHistoryGiftExchange')}
              </Button>
            </Stack>
          }
        />
        <FormUserDetail isLoading={isLoading} data={data} />
        <HistoryScanModal
          isOpen={isOpenHistoryScan}
          onClose={() => dispatch(setIsOpenModalHistoryScan(false))}
          userId={data?.userId}
        />
        <HistoryGiftModal
          isOpen={isOpenHistoryGift}
          onClose={() => dispatch(setIsOpenModalHistoryGift(false))}
          userId={data?.userId}
        />
      </Container>
    </Page>
  );
}
