import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'src/common/redux/store';
import { useSelector } from '../common/redux/store';
import HeaderEditHomeConfig from './components/HeaderEditHomeConfig';
import BannerAndServiceConfig from './components/banners-section/BannerConfig';
import NormalServicesConfig from './components/normal-services-section/NormalServicesConfig';
import Product1 from './components/product1';
import { useGetHomeConfigData } from './hooks/useGetHomeConfigData';
import { ISectionItem, ITypeSection } from './interface';
import { getSection, resetScreenState } from './slice';
import Product2 from './components/product2';
import Page from '../common/components/Page';
import { useTranslation } from 'react-i18next';
import useSettings from '../common/hooks/useSettings';

export default function EditHomConfigContainer() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const { data } = useGetHomeConfigData();

  const { dataRequest } = useSelector((state) => state.homeConfigurationReducer);

  useEffect(() => {
    dispatch(resetScreenState());
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (data?.sections && data?.sections?.length) dispatch(getSection(data?.sections));
    // @ts-ignore
  }, [data?.sections]);

  return (
    <>
      <Page title={t('homeConfig')}>
        <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
          <HeaderEditHomeConfig />
          {/* @ts-ignore */}
          {dataRequest?.map((item: ISectionItem) => {
            if (item?.type === ITypeSection.BANNER)
              return <BannerAndServiceConfig item={item} id={item?.id} key={item?.id} />;
            else if (item?.type === ITypeSection.NORMAL_SERVICE)
              return <NormalServicesConfig item={item} id={item?.id} key={item?.id} />;
            else if (item?.type === ITypeSection.HORIZONTAL_PRODUCT_LIST_1)
              return <Product1 item={item} id={item?.id} key={item?.id} />;
            else if (item?.type === ITypeSection.HORIZONTAL_PRODUCT_LIST_2)
              return <Product2 item={item} id={item?.id} key={item?.id} />;
          })}
        </Container>
      </Page>
    </>
  );
}
