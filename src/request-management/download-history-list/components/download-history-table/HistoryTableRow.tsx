import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, TableCell, TableRow } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { useGetRequestById } from '../../../request-detail/hooks/useGetRequestById';

import { setExportPopup, setFileId } from '../../../request-list/list-slice';
import { IPropsTableRow } from '../../interface';

export default function HistoryTableRow({ row }: IPropsTableRow) {
  const { fileName, email, createdAt } = row;
  return (
    <>
      <TableRow>
        <TableCell>{fileName}</TableCell>
        <TableCell align="left">{formatDay_DMY(createdAt)}</TableCell>
        <TableCell align="left">{email}</TableCell>
      </TableRow>
    </>
  );
}
