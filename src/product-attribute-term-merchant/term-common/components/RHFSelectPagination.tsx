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
} from '@mui/material';
import ListBox from '../../../common/components/ListBoxComponent';
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
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, ...field } }) => {
        return (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option[labelProp]}
            value={field.value}
            onChange={(event, values) => {
              field.onChange(values);
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
          />
        );
      }}
    />
  );
}
