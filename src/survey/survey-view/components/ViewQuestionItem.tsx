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
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { InvoiceItem } from '../../interfaces';
import {
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import { fCurrency, fNumber } from '../../../common/utils/formatNumber';
import Iconify from '../../../common/components/Iconify';
import ViewAnswerItemDetails from './ViewAnswerItem';
import vn from '../../../common/locales/vn';
import { IChoose } from '../../common/survey.constant';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';

type Type1 = {
  value: string;
};

export default function ViewQuestionItemDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionList',
  });

  const handleAdd = () => {
    append({
      answersList: [],
      content: '',
      type: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'text.disabled' }}>
        {vn.survey.listQuestion}:
      </Typography>

      <Stack spacing={3}>
        {fields?.map((item, index) => (
          <Card
            key={index}
            sx={{
              px: 5,
              py: 3,
              background: `linear-gradient(to right bottom, white, ${DEFAULT_MAIN_COLOR})`,
              borderRadius: '25px',
              boxShadow: 10,
            }}
          >
            <Stack alignItems="flex-end" spacing={1.5}>
              <Stack direction="column" spacing={2} sx={{ width: 1 }}>
                <RHFTextField
                  disabled
                  size="medium"
                  name={`questionList[${index}].content`}
                  label={`Câu hỏi ${index + 1}`}
                />

                <FormControl disabled sx={{ flexDirection: 'row', paddingLeft: 2 }}>
                  <RHFRadioGroup
                    sx={{ justifyContent: 'flex-start' }}
                    name={`questionList[${index}].type`}
                    options={[
                      { label: vn.simple, value: IChoose.SIMPLE },
                      { label: vn.multiple, value: IChoose.MULTIPLE },
                    ]}
                  />
                </FormControl>
                <ViewAnswerItemDetails questionIndex={index} />
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Box>
  );
}
