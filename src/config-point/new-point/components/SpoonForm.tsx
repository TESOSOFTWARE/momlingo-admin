import { Card, Stack } from '@mui/material';
import { RHFSwitch, RHFTextField } from '../../../common/components/hook-form';
import vn from '../../../common/locales/vn';

export default function SpoonForm() {
  return (
    <>
      <Card sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="point" label={vn.ConfigPoint.New.labelPoint} />
          <RHFTextField name="code" label={vn.ConfigPoint.New.labelCode} />
          <RHFTextField name="description" label={vn.ConfigPoint.New.labelDes} />
          <RHFTextField name="weight" label={vn.ConfigPoint.New.labelWeight} />
          <RHFTextField
            name="productGroup"
            label={vn.ConfigPoint.New.labelProductGroup}
          />
          <RHFSwitch name="isActive" label={vn.ConfigPoint.New.labelIsActive} />
        </Stack>
      </Card>
    </>
  );
}
