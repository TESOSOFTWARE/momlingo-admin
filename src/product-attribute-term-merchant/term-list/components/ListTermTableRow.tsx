import { Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import vn from '../../../common/locales/vn';
import { IPropsTableRow } from '../interface';

export default function ListTermTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const attributeName = row.productAttribute.productAttributeDetails[0].name;
  const lang = row.productAttributeTermDetails.map((item) => item.lang);
  const value = row.productAttributeTermDetails.map((item) => item.value);

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const { t } = useTranslation();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center">{attributeName}</TableCell>
        <TableCell align="center">
          {lang.map((item) => (
            <Typography key={item}>
              {' '}
              {item} <br />{' '}
            </Typography>
          ))}
        </TableCell>
        <TableCell align="center">
          {value.map((item) => (
            <Typography key={item}>
              {' '}
              {item} <br />{' '}
            </Typography>
          ))}
        </TableCell>
        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {t('delete')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  {t('edit')}
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
