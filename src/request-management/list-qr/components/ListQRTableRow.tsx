import { TableRow, TableCell, Switch, Checkbox } from '@mui/material';
import Chip from '@mui/material/Chip';
import { fDateTime } from 'src/common/utils/formatTime';
import { useSelector, dispatch } from 'src/common/redux/store';
import { setQrSelected, setModalChangeStatus, setValueChange } from '../qrCode.slice';
import dayjs from 'dayjs';
import { IResListQRCode } from '../../interfaces';

type Props = {
  data: IResListQRCode;
};

export default function ListQRTableRow({ data }: Props) {
  const stateRedux = useSelector((state) => state.qrCode);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setModalChangeStatus(true));
    dispatch(setQrSelected(data?.id));
    dispatch(setValueChange(e.target.checked));
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{data?.id}</TableCell>
        <TableCell align="left">{data?.code}</TableCell>
        <TableCell align="left">
          {dayjs(data?.useDate).format('MM-DD-YYYY HH:mm:ss')}
        </TableCell>
        <TableCell align="left">{data?.type}</TableCell>
        <TableCell align="left">
          <Switch checked={data?.is_active === true} onChange={handleChangeStatus} />
        </TableCell>
        <TableCell align="left">
          <Chip
            label={data?.status}
            color={data?.status === 'USED' ? 'primary' : 'default'}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
