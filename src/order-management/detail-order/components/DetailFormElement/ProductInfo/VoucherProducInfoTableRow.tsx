import {
  Box,
  MenuItem,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../../common/components/Iconify';
import { TableHeadCustom, TableMoreMenu } from '../../../../../common/components/table';
import { IOrderLine, IPropsTableRow } from '../../../interface';
import { TABLE_HEAD_VOUCHER } from '../../../constant';
import { formatDateNoTime } from '../../../../../common/constants/common.utils';

export default function VoucherProductInfoTableRow({ row, onDetailRow }: IPropsTableRow) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        {/* <TableCell align="left" sx={{ width: '110px' }}>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
              borderRadius: '7px',
              objectFit: 'cover',
            }}
            alt={row?.product?.productDetails[0]?.name}
            src={`${row?.product?.thumbnail?.url}`}
          />
        </TableCell> */}

        <TableCell align="center">{row?.product?.productDetails[0]?.name}</TableCell>
        <TableCell align="center">{row?.quantity}</TableCell>
        {/* <TableCell align="center">{row?.point}</TableCell> */}
        <TableCell align="center" sx={{ minWidth: '100px' }}>
          <Stack spacing={0.5}>
            {row?.externalProductUsedInfos?.map((item, index) => (
              <Typography
                key={index}
                sx={{ fontStyle: item.transactionId ? 'normal' : 'italic' }}
              >
                {item.transactionId ? item?.transactionId : 'Không xác định'}
              </Typography>
            ))}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack spacing={0.5}>
            {row?.externalProductUsedInfos?.map((item, index) => (
              <Typography
                key={index}
                sx={{ fontWeight: 'bold', fontStyle: item.status ? 'normal' : 'italic',
                color:  item?.status === 'USED' ?'green': 'red',
              
              }}
              >
                {item.status ? item?.status : 'Không xác định'}
              </Typography>
            ))}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack spacing={0.5}>
            {row?.externalProductUsedInfos?.map((item, index) => (
              <Typography
                key={index}
                sx={{ fontStyle: item.usedAt ? 'normal' : 'italic' }}
              >
                {item.usedAt ? formatDateNoTime(item?.usedAt) : 'Không xác định'}
              </Typography>
            ))}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack spacing={0.5}>
            {row?.externalProductUsedInfos?.map((item, index) => (
              <Typography
                key={index}
                sx={{ fontStyle: item.usedAt ? 'normal' : 'italic' }}
              >
                {item.expiresAt ? formatDateNoTime(item?.expiresAt) : 'Không xác định'}
              </Typography>
            ))}
          </Stack>
        </TableCell>
        {/* <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDetailRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'secondary.main' }}
                >
                  <Iconify icon={'ci:show'} />
                  Chi tiết
                </MenuItem>
              </>
            }
          />
        </TableCell> */}
      </TableRow>
      {/* <Table sx={{ width: '100%'}}>
        <TableHeadCustom
          headLabel={
           TABLE_HEAD_VOUCHER
          }
          rowCount={5}
        />

        <TableBody>
        </TableBody>
      </Table> */}
    </>
  );
}
