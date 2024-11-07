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

import DoneIcon from '@mui/icons-material/Done';
import Label from '../../../common/components/Label';
import { typeFeedbackTable } from '../../constants';
import { fDateTime24h } from '../../../common/utils/formatTime';
import { isValidURL } from '../../../common/constants/common.utils';
import { IPropsTableRow } from '../../interface';

export default function FeedbackTableRow({
  row,
  selected,
  onSelectRow,
}: IPropsTableRow) {
  const { id , name,phone,type,createdDate,rating, content } = row;
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
      <TableRow hover selected={selected}>
        <TableCell>{id}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{phone}</TableCell>
        <TableCell align="left">{fDateTime24h(createdDate)}</TableCell>
        <TableCell align="left">{typeFeedbackTable[type]}</TableCell>
        
        <TableCell align="center">{rating}</TableCell>
        <TableCell align="center">{content}</TableCell>
        
      </TableRow>
    </>
  );
}
