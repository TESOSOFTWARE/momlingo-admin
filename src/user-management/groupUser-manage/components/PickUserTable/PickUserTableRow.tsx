import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow, Checkbox } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { IPropsTableRow } from '../../../interfaces';
import { StatusAccountProps } from '../../../constants';
import { formatDate, formatDateNoTime } from '../../../../common/constants/common.utils';

export default function PickUserTableRow({ row, selected, onSelectRow }: IPropsTableRow) {
  const {
    name,
    phoneNumber,
    tierCode,
    email,
    id,
    status,
    lastScanDate,
    lastVisitDate,
    blockAccount,
    address,
    birthDate,
    userPoint,
    blockAddPoint,
  } = row;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onChange={(e) => onSelectRow && onSelectRow(e.target.checked)}
          />
        </TableCell>
        <TableCell
          align="left"
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {!name ? 'Không có' : name}
        </TableCell>
        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="center" sx={{ textTransform: 'uppercase' }}>
          {tierCode}
        </TableCell>
        {/* <TableCell align="left">{userPoint?.totalPoints}</TableCell> */}
        <TableCell align="left">{formatDateNoTime(birthDate)}</TableCell>
        <TableCell
          align="center"
          sx={{
            color: blockAccount ? 'red' : 'green',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {blockAccount ? 'Khóa' : 'Hoạt động'}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            color: blockAddPoint ? 'red' : 'green',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {blockAddPoint ? 'Chặn' : 'Không chặn'}
        </TableCell>
      </TableRow>
    </>
  );
}
