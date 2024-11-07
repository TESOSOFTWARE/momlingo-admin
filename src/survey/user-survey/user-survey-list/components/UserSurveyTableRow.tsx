import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { fDateTime24h } from 'src/common/utils/formatTime';
import { IUserSurveyTableProps } from '../../common/interface';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';

export default function UserSurveyTableRow({
  row,
  selected,
  onSelectRow,
  onViewDetailRow,
}: IUserSurveyTableProps) {
  const navigate = useNavigate();
  const { user, actionDate } = row;
  const { id: surveyId } = useParams();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
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
      <TableCell align="left">{user?.id}</TableCell>
      <TableCell
        align="left"
        sx={{
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={() =>
          navigate(
            PATH_DASHBOARD.survey.view_user_detail(parseInt(surveyId as string), user?.id)
          )
        }
      >
        {user?.customer?.name?.length > 30
          ? user?.customer?.name?.slice(0, 35)
          : user?.customer?.name}
      </TableCell>
      <TableCell align="center">{user?.customer?.phoneNumber}</TableCell>
      <TableCell align="center">{fDateTime24h(actionDate)}</TableCell>
      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onViewDetailRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'mdi:eye-outline'} />
                {t('common.tooltip.detail.title')}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
}
