import { Button, Stack, Typography } from '@mui/material';
import Iconify from '../../../common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { removeSectionItem } from '../../slice';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ITypeSection } from '../../interface';

export default function ProductHeader({
  title,
  id,
}: {
  title: string | undefined;
  id: string;
}) {
  const navigate = useNavigate();
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
          {title}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="basil:edit-outline" />}
            onClick={() => {
              navigate(
                PATH_DASHBOARD.homeConfig.editHorizontalProduct(
                  id,
                  ITypeSection.HORIZONTAL_PRODUCT_LIST_2
                )
              );
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="fluent:delete-24-regular" />}
            onClick={() => dispatch(removeSectionItem(id))}
          >
            Xóa
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
