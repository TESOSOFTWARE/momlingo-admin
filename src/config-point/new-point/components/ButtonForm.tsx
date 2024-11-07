import { LoadingButton } from '@mui/lab';
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

type IButtonProps = {
  isLoading: boolean;
};
export default function ButtonForm({ isLoading }: IButtonProps) {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      display="flex"
      justifyContent="flex-end"
      spacing={3}
      sx={{ marginTop: 3 }}
    >
      <LoadingButton
        variant="contained"
        startIcon={<Iconify icon="ic:outline-add-box" />}
        type="submit"
        loading={isLoading}
      >
        {vn.create}
      </LoadingButton>
      <Button
        onClick={() => navigate(PATH_DASHBOARD.point.list)}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
      >
        {vn.cancel}
      </Button>
    </Stack>
  );
}
