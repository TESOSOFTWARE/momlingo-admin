import { Box, Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import lodash from 'lodash';
import { useState } from 'react';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import en from '../../../../common/locales/en';
import { IPropTableRow } from '../../interface';

export default function VariantTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropTableRow) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">
        <Box
          component="img"
          sx={{
            height: 225,
            width: 325,
            maxHeight: { xs: 45, md: 45 },
            maxWidth: { xs: 45, md: 45 },
            borderRadius: '7px',
            objectFit: 'cover',
          }}
          alt={lodash.isEmpty(row.images) ? `no-images` : `${row.images[0].key}`}
          src={lodash.isEmpty(row.images) ? `no-images` : `${row.images[0].url}`}
        />
      </TableCell>

      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {lodash.isEmpty(row.name) ? 'no-name' : row.name}
      </TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.productVariantPoint.point}</TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center" sx={{ minWidth: '120px' }}>
        {row.productAttributeTerms?.map((item) =>
          lodash.isEmpty(item?.productAttribute) ? (
            'Không có'
          ) : (
            <>
              {item?.productAttribute?.productAttributeDetails[0]?.name}
              <br />
            </>
          )
        )}
      </TableCell>
      <TableCell align="center">
        {row?.productAttributeTerms?.map((item) => (
          <>
            {item?.productAttributeTermDetails[0]?.value}
            <br />
          </>
        ))}
      </TableCell>
      <TableCell align="center">
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
                {en.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {en.edit}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
}
