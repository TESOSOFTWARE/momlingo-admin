// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Card, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetProvince } from '../../../../order-management/edit-order/hooks/useGetProvince';
import RHFSearchSelectProvince from '../RHFSelectProvince';
import { RHFTextField } from '../../../../common/components/hook-form';

type Props = {
  disable?: boolean;
};

export default function DetailFormProvince({ disable }: Props) {
  const { control, setValue, watch, resetField } = useFormContext();
  const { t } = useTranslation();
  const { data: listProvince } = useGetProvince({
    params: { type: 'PROVINCE', page: 1, limit: 100 },
  });
  const provinceData =
    listProvince?.items?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
      };
    }) || [];
  return (
    <Box>
      <RHFTextField
        name="ordinal"
        label={'Thứ tự ưu tiên*'}
        type="number"
        sx={{ mb: 2, width: '20%' }}
      />
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'text.disabled' }}>
        Tỉnh thành chỉ định
      </Typography>

      <Card sx={{ boxShadow: 10, p: 1, pt: 2, borderRadius: '8px' }}>
        <RHFSearchSelectProvince
          name={`constraintProvince`}
          options={provinceData}
          labelProp="name"
          label="Chọn các Tỉnh/Thành"
          disabled={disable}
          disableSelect={disable}
        />
      </Card>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Box>
  );
}
