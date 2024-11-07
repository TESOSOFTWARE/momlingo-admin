import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { IExternalReferrerItem } from 'src/manage-store/interfaces';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { setConfirmDeleteModalStatus, setIdPicked } from '../../manageStore.slice';
import { replacePathParams } from '../../../common/utils/replaceParams';

type Props = {
  data: IExternalReferrerItem;
};

export const ListStoreTableRow = ({ data }: Props) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleDeleteRow = () => {
    dispatch(setConfirmDeleteModalStatus(true));
    dispatch(setIdPicked(data?.id));
  };

  return (
    <TableRow hover>
      <TableCell align="center">{data?.id}</TableCell>
      <TableCell align="center">{data?.code}</TableCell>
      <TableCell
        align="left"
        sx={{
          fontWeight: 'bold',
          color: 'red',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onClick={() =>
          navigate(replacePathParams(PATH_DASHBOARD.manageStore.detail, { id: data?.id }))
        }
      >
        {data?.name}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          maxWidth: 200,
          display: 'inline-block',
          textOverflow: 'ellipsis',
          overflow: 'hidden!important',
          whiteSpace: 'nowrap',
        }}
      >
        {data?.address}
      </TableCell>
      <TableCell align="left">{data?.phoneNumber}</TableCell>
      <TableCell align="center">{data?.referralCode}</TableCell>
      <TableCell align="center">{data?.totalUser}</TableCell>
      <TableCell align="center">{data?.totalUserScanned}</TableCell>
      <TableCell>
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  navigate(
                    replacePathParams(PATH_DASHBOARD.manageStore.detail, { id: data?.id })
                  );
                  handleCloseMenu();
                }}
                sx={{ color: 'secondary.main' }}
              >
                <Iconify icon={'ci:show'} />
                Chi tiết
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(
                    replacePathParams(PATH_DASHBOARD.manageStore.edit, { id: data?.id })
                  );
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Sửa
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};
