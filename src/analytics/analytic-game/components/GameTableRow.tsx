import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, TableCell, MenuItem, TableRow, Checkbox, Link } from '@mui/material';
import { id } from 'date-fns/locale';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { IPropsTableRowGame } from '../../interface';

export default function GameTableRow({ row, index }: IPropsTableRowGame) {
  const { date, total, totalWon } = row;
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
      <TableRow>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="left">{date}</TableCell>
        <TableCell align="center">{total}</TableCell>
        <TableCell align="center">{totalWon}</TableCell>
      </TableRow>
    </>
  );
}
