import { useEffect } from 'react';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { CreateStoreForm } from './components/CreateStoreForm';
import { useDispatch } from '../../common/redux/store';
import { setModeAction } from '../manageStore.slice';

export const CreateStoreContainer = () => {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModeAction('create'));
  }, []);

  return (
    <>
      <Page title={t('manage_store.createStore')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={t('manage_store.createStore')}
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              {
                name: BREADCUMBS.MANAGE_STORE_LIST,
                href: PATH_DASHBOARD.manageStore.list,
              },
              { name: t('manage_store.createStore') },
            ]}
          />

          <CreateStoreForm />
        </Container>
      </Page>
    </>
  );
};
