import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { useDispatch, useSelector } from '../../common/redux/store';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { ITypeSection } from '../interface';
import { setIsOpenPreviewSection, setNumberSaveSection, setSections } from '../slice';
import { getInfomationOfSection } from '../utils';
import { useEditHomeSections } from '../hooks/useEditHomeSections';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const typeSections = [
  {
    value: ITypeSection.BANNER,
    name: 'Banner',
  },
  {
    value: ITypeSection.NORMAL_SERVICE,
    name: 'Normal Services',
  },
  {
    value: ITypeSection.HORIZONTAL_PRODUCT_LIST_1,
    name: 'Horizontal Products 1',
  },
  {
    value: ITypeSection.HORIZONTAL_PRODUCT_LIST_2,
    name: 'Horizontal Products 2',
  },
];

export default function HeaderEditHomeConfig() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { dataRequest } = useSelector((state) => state.homeConfigurationReducer);
  const { mutate } = useEditHomeSections();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleClose = (event: any) => {
    const menuItemValue = event?.currentTarget.dataset?.myValue;
    if (menuItemValue) {
      const sectionInfo = getInfomationOfSection(menuItemValue);
      console.log(sectionInfo);
      // @ts-ignore
      dispatch(setSections(sectionInfo));
      if (sectionInfo?.type === ITypeSection.BANNER) {
        navigate(PATH_DASHBOARD.homeConfig.editBanner(sectionInfo.id));
      } else if (sectionInfo?.type === ITypeSection.NORMAL_SERVICE) {
        navigate(PATH_DASHBOARD.homeConfig.editNormalService(sectionInfo.id));
      } else if (
        sectionInfo?.type === ITypeSection.HORIZONTAL_PRODUCT_LIST_1 ||
        sectionInfo?.type === ITypeSection.HORIZONTAL_PRODUCT_LIST_2
      ) {
        navigate(
          PATH_DASHBOARD.homeConfig.editHorizontalProduct(
            sectionInfo.id,
            sectionInfo.type
          )
        );
      }
    }
    setAnchorEl(null);
  };

  const saveEditHomeConfig = () => {
    setIsLoadingSave(true);
    const newData = {
      sections: dataRequest,
    };
    mutate(newData, {
      onSuccess: () => {
        showSuccessSnackbar('Update Home Screen Successfully');
        setIsLoadingSave(false);
      },
      onError: () => {
        showErrorSnackbar('Update Home Screen Failed');
        setIsLoadingSave(false);
      },
    });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <HeaderBreadcrumbs
        heading={t('homeConfig')}
        links={[
          { name: t('dashboard'), href: PATH_DASHBOARD.root },
          { name: t('homeConfig'), href: PATH_DASHBOARD.homeConfig.root },
        ]}
      />
      <Box>
        <Button sx={{ marginRight: '10px' }} variant="outlined" onClick={handleClick}>
          Thêm section
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {typeSections?.map((typeSection, index: number) => (
            <MenuItem
              data-my-value={typeSection?.value}
              onClick={handleClose}
              key={index}
            >
              {typeSection?.name}
            </MenuItem>
          ))}
        </Menu>
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
