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
import {
  IFormRequest,
  IPropsTableRow,
} from '../../../../request-management/request-list/list-interface';
import {
  setExportPopup,
  setFileId,
} from '../../../../request-management/request-list/list-slice';
import ExportPopup from '../ExportPopup';
import { statusColorRequest, statusListRequest } from '../../list-constants';
import { fDateTime24h } from '../../../../common/utils/formatTime';

export default function CodeTableRow({ row }: IPropsTableRow) {
  const {
    name,
    addPointCodeQuantity,
    type,
    weight,
    productGroup,
    createdAt,
    id,
    status,
  } = row;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(PATH_DASHBOARD.requestManage.detail(`${id}`));
  };

  return (
    <>
      <TableRow>
        <TableCell
          align="left"
          onClick={handleClickDetail}
          sx={{ '&:hover': { color: '#0856A4', cursor: 'pointer' } }}
        >
          {name}
        </TableCell>
        <TableCell align="left">{fDateTime24h(createdAt)}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="left">{weight}</TableCell>
        <TableCell align="left">{addPointCodeQuantity}</TableCell>
        <TableCell
          align="left"
          sx={{
            color: statusColorRequest[status],
            textTransform: 'uppercase',
            fontWeight: '700',
          }}
        >
          {statusListRequest[status]}
        </TableCell>
        <TableCell align="center">{productGroup}</TableCell>
      </TableRow>
      <ExportPopup />
    </>
  );
}
