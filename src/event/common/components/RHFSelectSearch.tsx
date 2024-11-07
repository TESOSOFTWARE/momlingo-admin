// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Stack,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import ListBox from '../../../common/components/ListBoxComponent';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  labelSupport: string;
};

type Props = IProps & TextFieldProps;

export default function RHFSelectSystemConfigPoint({
  name,
  options,
  labelProp,
  labelSupport,
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
          onChange={(event, values) =>field.onChange(values)}
          fullWidth
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
          renderOption={(props, option) => {
            return (
              <li {...props}>
                <Stack
                  width={'100%'}
                  height={'100%'}
                  direction="row"
                  alignItems={'center'}
                  sx={{
                    '&:hover': {
                      borderRadius: '8px',
                      background: '#FFABAB',
                    },
                  }}
                >
                  <Box display={'flex'} ml={2} flexDirection={'column'}>
                    <Typography color={'text.secondary'}>
                      {option[labelProp]} - {option[labelSupport]}
                    </Typography>
                  </Box>
                </Stack>
              </li>
            );
          }}
          renderTags={(value, getTagProps) => {
            return value.map((val, index) => {
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={val.id}
                  label={`${val[labelProp]} - ${val[labelSupport]}`}
                  sx={{
                    boxShadow: 10,
                    color: 'black',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    background: 'linear-gradient(to left top, white, #FFABAB)',
                  }}
                />
              );
            });
          }}
        />
      )}
    />
  );
}
