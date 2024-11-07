// form
import { useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetListPhoneNumber } from '../../../hooks/useGetListPhoneNumber';
import RHFSelectPhoneNumber from '../RHFSelectPhoneNumber';
import { RHFTextField } from '../../../../common/components/hook-form';

type Props = {
  disable?: boolean;
};

export default function DetailFormAllocation({ disable }: Props) {
  const { control, setValue, watch, resetField } = useFormContext();
  const { t } = useTranslation();

  const {
    data: dataListPhoneNumber,
    fetchNextPage: fetchNextPageListPhoneNumber,
    isFetchingNextPage: isFetchingNextPageListPhoneNumber,
  } = useGetListPhoneNumber({
    page: 1,
    limit: 100,
  });

  const handleScrollListPhoneNumber = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageListPhoneNumber();
    }
  };
  const listPhoneNumber =
    dataListPhoneNumber?.pages
      ?.map((item) => item?.items?.map((itemUser) => itemUser?.phoneNumber))
      .flat() || [];
  return (
    <Box>
      <RHFTextField name="ordinal" label={'Thứ tự ưu tiên*'} type="number" sx={{ mb: 2, width: '20%'}}/>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'text.disabled' }}>
        Người dùng áp dụng
      </Typography>
        <Card
          sx={{
            p: 1,
            pt: 2,
            borderRadius: '8px',
            boxShadow: 10,
          }}
        >
          <RHFSelectPhoneNumber
            name="constraintPhoneNumber"
            options={listPhoneNumber}
            labelProp="phoneNumber"
            listBoxScroll={handleScrollListPhoneNumber}
            loadingScroll={isFetchingNextPageListPhoneNumber}
            label="Chọn số điện thoại áp dụng"
            disabled={disable}
            disabledSelect={disable}
          />
        </Card>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Box>
  );
}
