import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { optionsStatus } from '../constants';
import { getDefaultStatus, setStatus } from '../reducer';
import { IFormEditWheel, IResWheelDetail } from '../interface';

interface IEditWheelTableHeaderProps {
  data: IResWheelDetail | undefined;
  control: Control<IFormEditWheel>;
  setValue: any;
  errors: any;
}

export default function EditWheelTableHeader({
  data,
  control,
  setValue,
  errors,
}: IEditWheelTableHeaderProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const status = useSelector((state) => state.editWheelReducer.status);
  console.log('data?.status', status);

  useEffect(() => {
    // @ts-ignore
    setValue('editWheelName', data?.name);
    // @ts-ignore
    setValue('editStartDateWheel', data?.startDate);
    // @ts-ignore
    setValue('editEndDateWheel', data?.endDate);
    dispatch(getDefaultStatus(data?.status));
    // @ts-ignore
  }, [data?.name, data?.startDate, data?.endDate, data?.status]);
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
          name="editWheelName"
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
        {errors?.editWheelName && (
          <Typography sx={{ marginTop: '10px' }} color="error.main">
            {errors?.editWheelName?.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ height: '40px' }}>
        <Controller
          control={control}
          name="editStartDateWheel"
          render={({ field: { value, onChange } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label={t('startDate')}
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            );
          }}
        />
        {errors?.editStartDateWheel && (
          <Typography color="error.main" sx={{ marginTop: '10px' }}>
            {errors?.editStartDateWheel?.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ height: '40px' }}>
        <Controller
          control={control}
          name="editEndDateWheel"
          render={({ field: { value, onChange } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
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
        {errors?.editEndDateWheel && (
          <Typography sx={{ marginTop: '10px' }} color="error.main">
            {errors?.editEndDateWheel?.message}
          </Typography>
        )}
      </Box>
      <TextField
        select
        label={t('status')}
        onChange={(e) => {
          dispatch(setStatus(e.target.value as string));
        }}
        defaultValue={status}
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
