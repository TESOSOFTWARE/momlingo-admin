import { Card, Stack } from '@mui/material';
import { RHFSwitch, RHFTextField } from '../../../common/components/hook-form';

export default function SpoonForm() {
  return (
    <>
      <Card sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="point" label="Point" />
          <RHFTextField name="code" label="Code" />
          <RHFTextField name="description" label="Description" />
          <RHFSwitch name="isActive" label="Is Active" />
        </Stack>
      </Card>
    </>
  );
}
