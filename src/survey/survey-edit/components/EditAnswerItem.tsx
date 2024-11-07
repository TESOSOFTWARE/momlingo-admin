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

import useMessage from 'src/common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';

type Type1 = {
  questionIndex: number;
};

export default function EditAnswerItemDetails({ questionIndex }: Type1) {
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
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleRemove = (index: number) => {
    if (watch().questionList[questionIndex].answerList.length > 2) {
      remove(index);
    } else {
      showErrorSnackbar(vn.survey.create.noticeTwoAnswere);
    }
  };

  return (
    <Card
      sx={{
        px: 5,
        py: 3,
        background: `linear-gradient(to right bottom,  white, white, ${DEFAULT_MAIN_COLOR})`,
        borderRadius: '25px',
        boxShadow: 10,
      }}
    >
      <Stack spacing={3}>
        {fields?.map((item, index) => (
          <Stack key={item?.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction="column" spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`questionList[${questionIndex}].answerList[${index}].content`}
                label={`Câu trả lời ${index + 1}`}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              {vn.remove}
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          {vn.survey.addAnswere}
        </Button>
      </Stack>
    </Card>
  );
}
