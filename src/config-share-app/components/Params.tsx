import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Iconify from '../../common/components/Iconify';
import { RHFTextField } from '../../common/components/hook-form';

export default function ParamsField() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'params',
  });

  return (
    <>
      <Typography>Params</Typography>
      {fields.map((field: { id: React.Key | null | undefined }, index: any) => (
        <Box key={field.id} display={'flex'}>
          <RHFTextField
            name={`params[${index}].key`}
            label="Key"
            type="name"
            InputLabelProps={{ shrink: true }}
            sx={{
              marginRight: '4px',
            }}
          />
          <RHFTextField
            name={`params[${index}].value`}
            label="Value"
            type="name"
            InputLabelProps={{ shrink: true }}
          />
          <IconButton
            color="primary"
            onClick={() => {
              remove(index);
            }}
          >
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Box>
      ))}

      <IconButton color="primary" onClick={() => append({ key: '', value: '' })}>
        <Iconify icon={'eva:plus-fill'} />
      </IconButton>
    </>
  );
}