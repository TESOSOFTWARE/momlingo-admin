import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, IconButton, MenuItem, Autocomplete, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useGetDistrict } from '../../hooks/useGetDistrict';
import { useGetWard } from '../../hooks/useGetWard';
import { useGetProvince } from '../../hooks/useGetProvince';
import useDeepEffect from '../../../../common/hooks/useDeepEffect';
import { dispatch } from '../../../../common/redux/store';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAddress, IAddressItem } from '../../interface';
import { schemaEditAddress } from '../../schema';
import { DEFAULT_ADDRESS } from '../../constant';
import RHFSearchSelect from '../../../../common/components/hook-form/RHFSelectSearch';

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../../common/components/hook-form';
import {
  pickedAddressSelector,
  setIsOpenModalEditAddress,
  setPickedAddress,
} from '../../slice';
import { useSelector } from 'react-redux';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
  title: string;
};

export const EditAddressModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose, title } = props;
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<IAddress>({
    resolver: yupResolver(schemaEditAddress),
    defaultValues: DEFAULT_ADDRESS,
  });
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const { data: listProvince } = useGetProvince({
    params: { type: 'PROVINCE', page: 1, limit: 100 },
  });
  const { data: listDistrict, refetch: refetchDistrict } = useGetDistrict({
    params: { parentId: watch('province')?.id, type: 'DISTRICT', page: 1, limit: 50 },
  });

  const { data: listWard, refetch: refetchWard } = useGetWard({
    params: { parentId: watch('district')?.id, type: 'WARD', page: 1, limit: 50 },
  });
  const addressRedux = useSelector(pickedAddressSelector);

  useDeepCompareEffect(() => {
    setValue('district', undefined);
    setValue('ward', undefined);
  }, [watch('province')]);

  useDeepCompareEffect(() => {
    setValue('ward', undefined);
  }, [watch('district')]);

  useEffect(() => {
    dispatch(setPickedAddress(DEFAULT_ADDRESS));
  }, []);
  useDeepCompareEffect(() => {
    if (addressRedux) {
      reset(addressRedux);
    }
  }, [addressRedux]);

  const provinceData = listProvince?.items.map((item) => item).flat() || [];
  const districtData = listDistrict?.items || [];
  const wardData = listWard?.items || [];

  const onSubmit = (dataSubmit: any) => {
    dispatch(
      setPickedAddress({
        ...dataSubmit,
      })
    );
    onClose();
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: 'black!important', opacity: '0.2!important' },
        }}
        PaperProps={{
          sx: { boxShadow: 0 },
        }}
        fullWidth
        maxWidth={'lg'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{ mb: 5, textTransform: 'uppercase', justifyContent: 'space-between' }}
          >
            {title}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack
              sx={{
                padding: 2,
              }}
              spacing={3}
            >
              <RHFSearchSelect
                name="province"
                options={provinceData}
                labelProp="name"
                valueProp="id"
                label="Tỉnh/Thành"
              />
              <RHFSearchSelect
                name="district"
                options={districtData}
                labelProp="name"
                valueProp="id"
                label="Quận/Huyện"
              />
              <RHFSearchSelect
                name="ward"
                options={wardData}
                labelProp="name"
                valueProp="id"
                label="Phường/Xã"
              />
              <RHFTextField name="address1" label="Địa chỉ cụ thể" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="inherit" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button variant="contained" type="submit">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
};
