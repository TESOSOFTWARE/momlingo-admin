import { Box, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import en from '../../../../common/locales/en';
import vn from '../../../../common/locales/vn';
import { ProductFeatured } from '../../../product-common/components/ProductFeatured';
import { StatusChip } from '../../../product-common/components/StatusChip';
import { ProductStatus, ProductType, TaxStatus } from '../../../product-common/interface';
import { checkProductStatus } from '../../../product-common/utils/checkProductStatus';
import { IPropTableRow } from '../../product-interface';

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onDetailRow,
}: IPropTableRow) {
  const { name, status, taxStatus, type, isFeatured, thumbnailUrl, thumbnail } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left" sx={{ width: '100px' }}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            borderRadius: '7px',
            objectFit: 'cover',
          }}
          alt={name}
          src={`${thumbnailUrl}`}
        />
      </TableCell>
      <TableCell
        align="left"
        onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {name?.length > 30 ? name.slice(0, 35) + '...' : name}
      </TableCell>
      <TableCell align="center" sx={{ width: '90px' }}>
        {<ProductFeatured productType={isFeatured} />}
      </TableCell>
      <TableCell align="center">
        {
          <StatusChip
            labelProps={type}
            isActive={checkProductStatus(type)}
            colorChipTrue="#00AAAC"
            colorTextTrue="#EDFFFF"
            colorChipFalse="#ff427647"
            colorTextFalse="#EB1F6A"
          />
        }
      </TableCell>
      <TableCell align="center">
        {<StatusChip labelProps={status} isActive={checkProductStatus(status)} />}
      </TableCell>
      <TableCell align="center">
        {
          <StatusChip
            labelProps={taxStatus}
            isActive={checkProductStatus(taxStatus)}
            colorTextTrue="#FFCA00"
            colorChipTrue="#FAECB8"
            colorTextFalse="#2046F6"
            colorChipFalse="#A1DDF5"
          />
        }
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
                {vn.ListProduct.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {vn.ListProduct.edit}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
}
