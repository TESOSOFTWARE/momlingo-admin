import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { useDispatch, useSelector } from '../../common/redux/store';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { useEditShareAppConfig } from '../hooks/useEditShareAppConfig';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { setNumberSections, setSections } from '../slice';

export default function ShareAppConfigHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const { numberSections, dataRequest } = useSelector((state) => state.configShareApp);
  const handleClick = () => {
    const bannerInformation = {
      id: uuidv4(),
      data: [],
    };
    dispatch(setSections(bannerInformation));
    dispatch(setNumberSections(numberSections + 1));
    navigate(PATH_DASHBOARD.configShareApp.editBanner(bannerInformation?.id));
  };

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useEditShareAppConfig({
    onSuccess: () => {
      showSuccessSnackbar('Update Share App Screen Successfully');
      setIsLoadingSave(false);
    },
    onError: () => {
      showErrorSnackbar('Update Share App Screen Failed');
      setIsLoadingSave(false);
    },
  });

  const saveEditHomeConfig = () => {
    setIsLoadingSave(true);
    mutate(dataRequest);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <HeaderBreadcrumbs
        heading={'Cấu hình chia sẻ app'}
        links={[
          { name: t('dashboard'), href: PATH_DASHBOARD.root },
          { name: t('homeConfig'), href: PATH_DASHBOARD.configShareApp.root },
        ]}
      />
      <Box>
        {numberSections < 2 ? (
          <Button sx={{ marginRight: '10px' }} variant="outlined" onClick={handleClick}>
            Thêm banner
          </Button>
        ) : (
          <Button
            sx={{
              marginRight: '10px',
              bgcolor: '#B2B2B2',
              color: '#3C4048',
              borderWidth: 0,
            }}
            variant="outlined"
          >
            Thêm banner
          </Button>
        )}
        <LoadingButton
          loading={isLoadingSave}
          variant="contained"
          onClick={saveEditHomeConfig}
          sx={{ marginRight: '10px', width: '130px' }}
        >
          {'Lưu'}
        </LoadingButton>
      </Box>
    </Box>
  );
}
