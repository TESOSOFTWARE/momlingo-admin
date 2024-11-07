import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPropsSaleForceTable } from '../../interface';

export default function SaleForceNotiTableRow({ row }: IPropsSaleForceTable) {
  const { id, customerId, campaignMemberId, notiId } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <>
      <TableRow hover>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: 200,
          }}
          align='center'
        >
          {campaignMemberId}
        </TableCell>
        <TableCell align="center">{notiId}</TableCell>
        <TableCell align="center">{customerId}</TableCell>
      </TableRow>
    </>
  );
}
