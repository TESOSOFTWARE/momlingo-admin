import { useEffect } from 'react';
import { useDispatch } from 'src/common/redux/store';
import { useSelector } from '../common/redux/store';
import BannerConfig from './components/BannerConfig';
import ShareAppConfigHeader from './components/ShareAppConfigHeader';
import { useGetShareAppConfig } from './hooks/useGetShareAppConfig';
import { IDataRequest } from './interface';
import { getSection, resetScreenState, setNumberSections } from './slice';
import useSettings from '../common/hooks/useSettings';
import Page from '../common/components/Page';
import { Container } from '@mui/material';

export default function EditHomConfigContainer() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { data } = useGetShareAppConfig();

  const { dataRequest } = useSelector((state) => state.configShareApp);

  useEffect(() => {
    dispatch(resetScreenState());
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (data?.sections && data?.sections?.length) {
      dispatch(getSection(data?.sections));
      dispatch(setNumberSections(data?.sections?.length));
    }
    // @ts-ignore
  }, [data?.sections]);

  return (
    <>
      <Page title={'Cấu hình chia sẻ app'}>
        <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
          <ShareAppConfigHeader />
          {dataRequest?.map((item: IDataRequest, index) => {
            return <BannerConfig key={index} item={item} />;
          })}
        </Container>
      </Page>
    </>
  );
}
