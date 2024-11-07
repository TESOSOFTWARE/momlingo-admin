// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Box,
  Avatar,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import ListBox from '../../../../common/components/ListBoxComponent';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  disabledSelect?: boolean;
  listBoxScroll: any; 
  loadingScroll?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelectPhoneNumber({
  name,
  options,
  labelProp,
  disabledSelect,
  listBoxScroll,
  loadingScroll,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, ...field } }) => (
        <Autocomplete
          {...field}
          // disableCloseOnSelect
          disabled={disabledSelect}
          options={options}
          getOptionLabel={(option) => option}
          value={field.value}
          onChange={(event, values) => field.onChange(values)}
          fullWidth
          ListboxComponent={ListBox}
        //   isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={loadingScroll}
          renderInput={(params) => {
            return (
              <Stack direction={'column'} spacing={2} height={'100%'}>
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  {...other}
                />
              </Stack>
            );
          }}
          ListboxProps={{
            onScroll: listBoxScroll,
          }}
        />
      )}
    />
  );
}
