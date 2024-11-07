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
import EditAnswerItemDetails from './EditAnswerItem';
import vn from '../../../common/locales/vn';
import { IChoose } from '../../common/survey.constant';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';

type Type1 = {
  value: string;
};

export default function EditQuestionItemDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionList',
  });

  const handleAdd = () => {
    append({
      answerList: [
        {
          content: '',
        },
        {
          content: '',
        },
      ],
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
            key={item?.id}
            sx={{
              px: 5,
              py: 3,
              background: `linear-gradient(to right bottom,  white, white, ${DEFAULT_MAIN_COLOR})`,
              borderRadius: '25px',
              boxShadow: 10,
            }}
          >
            <Stack alignItems="flex-end" spacing={1.5}>
              <Stack direction="column" spacing={2} sx={{ width: 1 }}>
                <RHFTextField
                  size="medium"
                  name={`questionList[${index}].content`}
                  label={`Câu hỏi ${index + 1}`}
                />

                <FormControl sx={{ flexDirection: 'row', paddingLeft: 2 }}>
                  <RHFRadioGroup
                    sx={{ justifyContent: 'flex-start' }}
                    name={`questionList[${index}].type`}
                    options={[
                      { label: vn.simple, value: IChoose.SIMPLE },
                      { label: vn.multiple, value: IChoose.MULTIPLE },
                    ]}
                  />
                </FormControl>
                <EditAnswerItemDetails questionIndex={index} />
              </Stack>

              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                onClick={() => handleRemove(index)}
              >
                {vn.remove}
              </Button>
            </Stack>
          </Card>
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
          {vn.survey.addQuestion}
        </Button>
      </Stack>
    </Box>
  );
}
