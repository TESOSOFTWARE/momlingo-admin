import { Checkbox, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IPropsTableRow } from 'src/config-point/list-point/interface';
import vn from '../../../../common/locales/vn';
import { renderNull } from '../../../common/utils/renderNull';

export default function PointTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsTableRow) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const {
    createdAt,
    id,
    code,
    point,
    type,
    description,
    isActive,
    productGroup,
    weight,
  } = row;

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center">{code}</TableCell>
        <TableCell align="center">{point}</TableCell>
        <TableCell align="center">{renderNull(productGroup)}</TableCell>
        <TableCell align="center">{type}</TableCell>
        <TableCell align="center">{renderNull(weight)}</TableCell>
        <TableCell align="center">{<Switch checked={isActive} />}</TableCell>
        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  {vn.edit}
                </MenuItem>

                <MenuItem
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {vn.delete}
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
