import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import { dispatch } from 'src/common/redux/store';
import Iconify from '../../../common/components/Iconify';
import vn from '../../../common/locales/vn';
import { convertStringToBoolean } from '../../common/utils/convertStringToBoolean';
import { IsActiveSearch, TypeSearch } from '../constant';
import { IDataSearch, IListFilter } from '../interface';
import { setPointFilter } from '../slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function ListFilter({ onSetPage }: Props) {
  const methods = useForm<IListFilter>();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: IListFilter) => {
    const newData: IDataSearch = {
      searchText: data.searchText,
      type: data.type === '' ? undefined : data.type,
      isActive: convertStringToBoolean(data.isActive),
    };
    onSetPage(0);
    dispatch(setPointFilter(newData));
  };
  const handleClickClear = () => {
    reset({
      searchText: '',
      type: '',
      isActive: '',
    });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={3} sx={{ padding: 3 }}>
          <RHFTextField
            size="small"
            name="searchText"
            label={vn.ConfigPoint.List.labelCodeFilter}
          />
          <RHFSelect name="type" size="small" label="Kiểu">
            {TypeSearch.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>

          <RHFSelect name="isActive" size="small" label="Trạng thái hoạt động">
            {IsActiveSearch.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>

          <Button
            size="small"
            variant="contained"
            type="submit"
            sx={{ minWidth: 'fit-content' }}
            startIcon={<Iconify icon="majesticons:search-line" />}
          >
            {vn.search}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="majesticons:eraser-line" />}
            onClick={handleClickClear}
          >
            {vn.cancel}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
