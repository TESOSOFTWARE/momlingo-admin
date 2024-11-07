import { CSVLink } from 'react-csv';
import { headerCSVExport } from '../constants';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetListHistoryWinning } from '../hooks/useGetListHistoryWinning';
import { useSelector } from 'src/common/redux/store';
import { IDataListHistory } from '../interface';

type Props = {
  data: IDataListHistory[];
};

export default function ExportButton({ data }: Props) {
  const { t } = useTranslation();
  return (
    <CSVLink
      data={data}
      headers={headerCSVExport}
      filename={'winning-history.csv'}
      style={{
        textDecoration: 'none',
      }}
    >
      <Button variant="contained">
        <FileDownloadIcon sx={{ width: '16px', height: '16px', marginRight: '10px' }} />{' '}
        {t('export')}
      </Button>
    </CSVLink>
  );
}
