import { LoadingButton } from "@mui/lab";
import { TextField,Stack,Button } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers";
import {Controller, useForm } from "react-hook-form";
import AppCurrentDownload from "../../../common/components/analytics/AppCurrentDownload";
import { FormProvider } from "../../../common/components/hook-form";
import Iconify from "../../../common/components/Iconify";
import vn from "../../../common/locales/vn";
import { dispatch } from "../../../common/redux/store";
import { LabelStyle } from "../../../config-home/components/banners-section/BannerConfig";
import { ISearchForm } from "../../interface";
import { setSearchParams } from "../../slice";

export default function OrderFilter() {
    const methods = useForm<ISearchForm>({
        defaultValues: {
          startDate: '',
          endDate: '',
        },
      });
      const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
        watch,
      } = methods;

      const handleClickClear = () => {
        reset({
          startDate: null,
          endDate: null,
        });
        dispatch(setSearchParams({
            startDate: undefined,
            endDate: undefined,
          }))
      };
      const onSubmit = (data: ISearchForm) => {
        Object.keys(data).map((obj: string) => {
          if (data[obj as keyof ISearchForm] === '') {
            delete data[obj as keyof ISearchForm];
          }
        });
        dispatch(setSearchParams(data))
    
      };
return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   <Stack direction="column" justifyContent="center" spacing={2}  >
        <LabelStyle>Lọc cho tổng quan & chi tiết</LabelStyle>
          <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={vn.Request_startDate}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        helperText={errors.startDate && errors.startDate?.message}
                        error={!!errors.startDate}
                        type="number"
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={vn.Request_endDate}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        helperText={errors.endDate && errors.endDate?.message}
                        error={!!errors.endDate}
                        type="number"
                      />
                    )}
                  />
                </Stack>
              )}
            />
             <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ minWidth: '100px!important' }}
              startIcon={<Iconify icon="material-symbols:filter-alt" />}
            >
              {vn.filter}
            </LoadingButton>
            <Button
              size="small"
              color="inherit"
              sx={{ minWidth: '100px!important' }}
              variant="contained"
              onClick={handleClickClear}
              startIcon={<Iconify icon="ph:x-bold" />}
            >
              {vn.cancel}
            </Button>
          </Stack>
  </FormProvider>)}