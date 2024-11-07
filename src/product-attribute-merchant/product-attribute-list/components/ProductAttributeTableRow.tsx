import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { IPropsProductAttribute } from '../interface/interface';
import { ActiveChip, BannedChip } from './StatusChip';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';

export default function ProductAttributeTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsProductAttribute) {
  const { id, productAttributeDetails } = row;
  // row.productAttributeDetails[0]
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center" onClick={() =>  navigate(replacePathParams(PATH_DASHBOARD.product_attribute.edit, { id: id }))} sx={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>{productAttributeDetails[0]?.name}</TableCell>
        <TableCell align="center">{row?.type}</TableCell>
        <TableCell align="center">{productAttributeDetails[0]?.description}</TableCell>
        <TableCell align="center">{productAttributeDetails[0]?.lang}</TableCell>
        <TableCell align="center">
          {row?.hasArchives ? <ActiveChip /> : <BannedChip />}
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
                  {t('deleteProductAttribute')}
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
