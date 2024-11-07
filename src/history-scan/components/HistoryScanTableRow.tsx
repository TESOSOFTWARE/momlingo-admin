import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow, Chip } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { IPropsTableRow } from '../interfaces';
import { useState } from 'react';
import { formatDate } from '../../common/constants/common.utils';
import { StatusHistoryScan } from '../constants';

export default function HistoryScanTableRow({ row }: IPropsTableRow) {
  const { id, code, scanDate, status, scanPoint, systemConfigPoint, user } = row;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          align="left"
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {code}
        </TableCell>
        <TableCell align="center">{user?.customer?.phoneNumber}</TableCell>
        <TableCell align="center">{systemConfigPoint?.productGroup}</TableCell>
        <TableCell align="center">{systemConfigPoint?.point}</TableCell>
        <TableCell align="center">
          <Chip
            label={status}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background:
                status === StatusHistoryScan.SUCCESS
                  ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                  : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
            }}
          />
        </TableCell>
        <TableCell align="center">{formatDate(scanDate)}</TableCell>
      </TableRow>
    </>
  );
}
