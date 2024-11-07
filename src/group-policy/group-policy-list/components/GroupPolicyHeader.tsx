import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function GroupPolicyHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <HeaderBreadcrumbs
          heading={t('group_policy.list.root')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('group_policy.root'), href: PATH_DASHBOARD.groupPolicy.root },
            { name: t('list') },
          ]}
        />
      </Box>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          navigate(PATH_DASHBOARD.groupPolicy.create);
        }}
        sx={{
          color: 'common.white',
          backgroundColor: 'primary.main',
          marginRight: '40px',
        }}
      >
        {t('group_policy.list.add')}
      </Button>
    </Box>
  );
}
