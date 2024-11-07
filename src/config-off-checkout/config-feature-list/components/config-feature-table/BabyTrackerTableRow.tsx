import { MenuItem, Stack, Switch, TableCell, TableRow, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../../common/components/Iconify';
import {
  setIsOpenConfirmModal,
} from '../../config-feature-slice';
import ConfirmChangeConfigFeatureModal from './ConfigFeatureModal';
import { PregnancyWeekInfo } from '../../baby-tracker-interface';
import { TableMoreMenu } from '../../../../common/components/table';
import { formatDateNoTime } from '../../../../common/constants/common.utils';
import AlertDialogSlide from '../dialog/dialog-confirm';
import { useRemoveBabyTracker } from '../../hooks/useRemoveBabyTracker';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
export interface IPropsBabyTrackerListTable {
  rowCode: string;
  TrackerList?: PregnancyWeekInfo[];
}
function BabyTrackerTableRow({
  rowCode,
  TrackerList,
}: IPropsBabyTrackerListTable) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [status, setStatus] = React.useState<'agree' | 'disagree' | null>(null);
  const { mutate } = useRemoveBabyTracker();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleRemoveRow = () =>{
    setDialogOpen(true);
  }
  // Kiểm tra và in ra thông tin của trackerItem
  const handleStatusChange = (newStatus: 'agree' | 'disagree') => {
    setStatus(newStatus);  // Lưu trạng thái agree/disagree
    console.log('User selected:', newStatus);
    if(newStatus ==='agree')
    {
      mutate(TrackerList?.[+rowCode].week.toString() || '');
    }else{
      setDialogOpen(false);
    }
  };
  const handleDialogClose = () => {
    setDialogOpen(false);  // Đóng dialog
  };
  return (
    <>
      <AlertDialogSlide
        open={dialogOpen}  // Điều khiển trạng thái mở của dialog
        onClose={handleDialogClose}  // Đóng dialog khi cần
        onStatusChange={handleStatusChange}  // Gửi trạng thái về parent
      />
      <TableRow hover sx={{ borderBottom: '1px dotted gray' }}>
        <TableCell align="center">{TrackerList?.[+rowCode].week}</TableCell>
        <TableCell align="left">{TrackerList?.[+rowCode].keyTakeaways}</TableCell>
        <TableCell align="center">{formatDateNoTime(TrackerList?.[+rowCode].createdAt)}</TableCell>
        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
                  <MenuItem
                    onClick={() => {
                      const weekValue = TrackerList?.[+rowCode]?.week;  // Lấy giá trị tuần
                      if (weekValue) {
                        navigate(PATH_DASHBOARD.configFeature.edit.babyTracker.replace(':week', weekValue.toString()));
                        console.log('Navigating to week', weekValue);
                      } else {
                        console.error('Invalid week value');
                      }
                    }}
                  >
                    <Iconify icon={'mdi:eye-outline'} />
                    Xem
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleRemoveRow();
                      handleCloseMenu();
                    }}
                    sx={{
                      color:'red'
                    }}
                  >
                      <>
                        <Iconify icon={'material-symbols:delete'} />
                        Xoá tracker
                      </>
                  </MenuItem>

                </Stack>
              </>
            }
          />
        </TableCell>
      </TableRow>
     
    </>
  );
}

export { BabyTrackerTableRow };
