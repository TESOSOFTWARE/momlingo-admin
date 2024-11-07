import { Card, Stack } from '@mui/material';
import { RHFSelect, RHFSwitch, RHFTextField } from '../../../common/components/hook-form';
import vn from '../../../common/locales/vn';
import {
  IDataProductGroup,
  IDataWeight,
  IProductGroup,
  IWeight,
} from '../../../request-management/interfaces';
import i18n from '../../../common/locales/i18n';
import { UseFormWatch } from 'react-hook-form';
import { INewPoint } from '../interface';

export default function SpoonForm() {
  return (
    <>
      <Card sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <RHFTextField
            name="productGroup"
            label={vn.ConfigPoint.New.labelProductGroup}
          />
          <RHFTextField name="weight" label={vn.ConfigPoint.New.labelWeight} />
          <RHFTextField name="point" label={vn.ConfigPoint.New.labelPoint} />
          <RHFTextField name="code" label={vn.ConfigPoint.New.labelCode} />
          <RHFTextField name="description" label={vn.ConfigPoint.New.labelDes} />
          <RHFSwitch name="isActive" label={vn.ConfigPoint.New.labelIsActive} />
        </Stack>
      </Card>
    </>
  );
}
