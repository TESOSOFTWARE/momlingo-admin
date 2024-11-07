import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
  MenuItem,
  Card,
} from '@mui/material';
import { InvoiceItem } from '../../interfaces';
import { RHFSelect, RHFSwitch, RHFTextField } from '../../../common/components/hook-form';
import { fCurrency, fNumber } from '../../../common/utils/formatNumber';
import Iconify from '../../../common/components/Iconify';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';
// utils
// import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// @types
// import { InvoiceItem } from '../../../../@types/invoice';
// components
// import Iconify from '../../../../components/Iconify';
// import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

type Type1 = {
  questionIndex: number;
};

export default function ViewAnswerItemDetails({ questionIndex }: Type1) {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questionList[${questionIndex}].answerList`,
  });

  const handleAdd = () => {
    append({
      content: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Card
      sx={{
        px: 5,
        py: 3,
        background: `linear-gradient(to right bottom, white, ${DEFAULT_MAIN_COLOR})`,
        borderRadius: '25px',
        boxShadow: 10,
      }}
    >
      <Stack spacing={3}>
        {fields?.map((item, index) => (
          <Stack key={index} alignItems="flex-end" spacing={1.5}>
            <Stack direction="column" spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                disabled
                size="small"
                name={`questionList[${questionIndex}].answerList[${index}].content`}
                onChange={(e) => e.target.value}
                label={`Câu trả lời ${index + 1}`}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Card>
  );
}
