import { Button, Stack, Typography } from '@mui/material';
import Iconify from '../../../common/components/Iconify';

export default function ProductHeader() {
  return (
    <>
      <Stack
        direction="row"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{
            paddingLeft: 3,
            fontWeight: 550,
            fontSize: '18px',
            color: '#666E80',
          }}
        >
          Sản phẩm Aiwado
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" startIcon={<Iconify icon="basil:edit-outline" />}>
            Chỉnh sửa
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="fluent:delete-24-regular" />}
          >
            Xóa
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
