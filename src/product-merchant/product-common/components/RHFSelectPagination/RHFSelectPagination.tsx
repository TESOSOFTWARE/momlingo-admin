// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Box,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import ListBox from '../../../../common/components/ListBoxComponent';
import { useState } from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  listBoxScroll: any;
  loadingScroll?: boolean;
  isLoading: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelectPagination({
  name,
  options,
  labelProp,
  listBoxScroll,
  loadingScroll,
  isLoading,
  ...other
}: Props) {
  const [listValue, setListValue] = useState<Array<any>>([]);
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, ...field } }) => {
        if (field.value !== undefined) setListValue(field.value);
        return (
          <Autocomplete
            {...field}
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option[labelProp]}
            value={listValue}
            onChange={(event, values) => {
              field.onChange(values);
              setListValue(values);
            }}
            fullWidth
            ListboxComponent={ListBox}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={isLoading ? isLoading : loadingScroll}
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
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Stack
                    width={'100%'}
                    direction="row"
                    spacing={2}
                    alignItems={'center'}
                    sx={{
                      '&:hover': {
                        borderRadius: '8px',
                        background: '#FFF9DE',
                      },
                    }}
                  >
                    <Box display={'flex'} ml={3} flexDirection={'column'}>
                      <Typography color={'text.secondary'}>
                        {option[labelProp]}
                      </Typography>
                    </Box>
                  </Stack>
                </li>
              );
            }}
            ListboxProps={{
              onScroll: listBoxScroll,
            }}
            renderTags={(value, getTagProps) => {
              return value.map((val, index) => {
                return (
                  <Chip
                    {...getTagProps({ index })}
                    key={val.id}
                    label={`${val[labelProp]}`}
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
        );
      }}
    />
  );
}
