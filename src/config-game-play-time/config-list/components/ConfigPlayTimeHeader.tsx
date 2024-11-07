import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ConfigPlayTimeHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <HeaderBreadcrumbs
          heading={t('configPlayTime.list.title')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('configPlayTime.root'), href: PATH_DASHBOARD.configPlayTime.root },
            { name: t('list') },
          ]}
        />
      </Box>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          navigate(PATH_DASHBOARD.configPlayTime.create);
        }}
        sx={{
          color: 'common.white',
          backgroundColor: 'primary.main',
          marginRight: '40px',
        }}
      >
        {t('configPlayTime.create.title')}
      </Button>
    </Box>
  );
}
