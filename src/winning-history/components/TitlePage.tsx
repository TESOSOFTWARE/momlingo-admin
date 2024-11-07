import { Box, Typography, Breadcrumbs, Stack, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExportButton from './ExportButton';
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { IDataListHistory } from '../interface';

type Props = {
  dataHistory: IDataListHistory[];
};

export default function TitlePage({ dataHistory }: Props) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        marginBottom: '4rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ marginBottom: '10px', textTransform: 'capitalize' }}
        >
          {t('history_winning')}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" separator={<Dots />}>
          <Typography color="text.primary">Dashboard</Typography>
          <Typography color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {t('history_winning')}
          </Typography>
          <Typography>{t('list')}</Typography>
        </Breadcrumbs>
      </Box>
      {/* <Button variant='contained'><FileDownloadIcon sx={{width: '16px', height: '16px', marginRight: '10px'}}/> Export</Button> */}
      <ExportButton data={dataHistory} />
    </Box>
  );
}

const Dots = () => {
  return (
    <Box
      sx={{
        width: '4px',
        height: '4px',
        background: grey[600],
        borderRadius: '50%',
      }}
    ></Box>
  );
};
