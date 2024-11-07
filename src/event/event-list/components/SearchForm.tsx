import {
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
  Button,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { useForm, Controller } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { useDispatch } from '../../../common/redux/store';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../common/components/Iconify';
import { setSearchText } from '../../common/slice';
import { IParamsEvent } from '../../common/interfaces';

type SearchFormProps = {
  setPage: (...args: any[]) => any;
};

export function SearchForm({ setPage }: SearchFormProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const methods = useForm({ defaultValues: {
    searchText: '',
  } });
  const { handleSubmit, reset, control } = methods;

  const onSubmit = (data: any) => {
    dispatch(setSearchText(data?.searchText));
  };

  const onReset = () => {
    reset({
      searchText: '',
    });
    dispatch(setSearchText(''));
    setPage(0);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} pt={4} px={4}>
        <RHFTextField
          size="medium"
          name="searchText"
          placeholder="Tìm kiếm sự kiện..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />

        <Stack
          direction={{ sm: 'column', md: 'row' }}
          spacing={2}
          pb={4}
          justifyContent={'start'}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Iconify icon="ic:outline-search" />}
          >
            {t('event.list.filter.submit')}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={onReset}
            startIcon={<Iconify icon="ph:x-bold" />}
          >
            {t('event.list.filter.reset')}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
