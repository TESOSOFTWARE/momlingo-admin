import { Button, Box } from '@mui/material';
import React from 'react';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { useDispatch } from '../../../common/redux/store';
import { handleAddNewrow, setIsOpenWheelImageModal } from '../reducer';

export default function EditWheelHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <HeaderBreadcrumbs
        heading={t('titleEditEvent')}
        links={[
          { name: t('dashboard'), href: PATH_DASHBOARD.root },
          { name: t('eventList'), href: PATH_DASHBOARD.event.list },
          { name: t('edit') },
        ]}
      />
      <Box>
        <Button
          sx={{ marginRight: '10px' }}
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => dispatch(setIsOpenWheelImageModal(true))}
        >
          {t('previewWheel')}
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            const newRow = {
              eventName: 'hello world',
              id: uuid(),
              giftCode: 2000,
              amount: 12,
              winRate: 100,
              ordinal: 0,
            };
            dispatch(handleAddNewrow(newRow));
          }}
        >
          {t('addNewRow')}
        </Button>
      </Box>
    </Box>
  );
}
