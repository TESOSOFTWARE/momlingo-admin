import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IFormCreateNewWheel } from '../interface';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { optionsStatus } from '../constants';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { setStatus } from '../reducer';
import React from 'react';

interface IWheelNameProps {
  control: Control<IFormCreateNewWheel>;
  errors: any;
}
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export default function WheelName({ control, errors }: IWheelNameProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.configWheelReducer.status);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100px',
      }}
    >
      <Box sx={{ height: '40px' }}>
        <Controller
          name="wheelName"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextField
                onChange={onChange}
                value={value}
                sx={{ width: '400px' }}
                label={t('wheelName')}
                placeholder={t('wheelNamePlaceholder')}
              />
            );
          }}
        />
        {errors?.wheelName && (
          <Typography sx={{ marginTop: '10px' }} color="error.main">
            {errors?.wheelName?.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ height: '40px' }}>
        <Controller
          control={control}
          name="startDateWheel"
          render={({ field: { value, onChange } }) => {
            return (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: 'Check-in', end: 'Check-out' }}
              >
                <DesktopDatePicker
                  label={t('startDate')}
                  inputFormat="DD/MM/YYYY"
                  minDate={new Date()}
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            );
          }}
        />
        {errors?.startDateWheel && (
          <Typography color="error.main" sx={{ marginTop: '10px' }}>
            {errors?.startDateWheel?.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ height: '40px' }}>
        <Controller
          control={control}
          name="endDateWheel"
          render={({ field: { value, onChange } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  minDate={tomorrow}
                  label={t('endDate')}
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            );
          }}
        />
        {errors?.endDateWheel && (
          <Typography sx={{ marginTop: '10px' }} color="error.main">
            {errors?.endDateWheel?.message}
          </Typography>
        )}
      </Box>
      <TextField
        select
        label={t('status')}
        value={status}
        onChange={(e) => {
          dispatch(setStatus(e.target.value as string));
        }}
        sx={{
          width: '200px',
          textTransform: 'capitalize',
          height: '40px',
        }}
      >
        {optionsStatus.map((option: { name: string; value: string }, index: number) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option?.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
