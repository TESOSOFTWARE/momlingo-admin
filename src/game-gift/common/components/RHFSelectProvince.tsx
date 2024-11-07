// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, Autocomplete } from '@mui/material';
import ListBox from '../../../common/components/ListBoxComponent';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  disableSelect?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSearchSelectProvince({
  name,
  options,
  labelProp,
  disableSelect,
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
          multiple
          disableCloseOnSelect
          options={options}
          value={field.value}
          getOptionLabel={(option) => option[labelProp]}
          onChange={(event, values) => field.onChange(values)}
          fullWidth
          disabled={disableSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          ListboxComponent={ListBox}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
        />
      )}
    />
  );
}
