import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import en from '../../../common/locales/en';
import { useDispatch } from '../../../common/redux/store';
import { setIsOpenQRCodeModal } from '../../code-common/code.slice';

export default function CodeEditHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <HeaderBreadcrumbs
        heading={en.editCodeHeading}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.CODE_EDIT },
          { name: en.edit },
        ]}
      />
      <Button variant="contained" onClick={() => dispatch(setIsOpenQRCodeModal(true))}>
        {t('getQRCode')}
      </Button>
    </Box>
  );
}
