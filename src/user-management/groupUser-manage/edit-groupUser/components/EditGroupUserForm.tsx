import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  FormLabel,
  InputLabel,
  Paper,
  Select,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IFormCreateGroupUser } from '../../interfaces';
import { schemaGroupUser } from '../../shema';
import { DEFAULT_VALUE_GROUP_USER, GroupUserStatus, UserRank } from '../../constants';
import { useCreateGroupUser } from '../../hooks/useCreateGroupUser';
import { RHFSelectPagitnationMultiple } from '../../../../common/components/hook-form/RHFSelectPaginationMutiple';
import { getListGroupUser } from '../../services';
import RHFMultipleSelect from '../../../../common/components/hook-form/RHFMultipleSelect';
import useDeepEffect from '../../../../common/hooks/useDeepEffect';
import { useGetGroupUserById } from '../../hooks/useGetGroupUserById';
import {
  ListPickUserSelector,
  dataCheckAllUserSelector,
  isCheckAllSelector,
  isOpenModalPickUserSelector,
  setDataCheckAllUsers,
  setIsCheckAll,
  setIsOpenModalPickUser,
  setListPickedUser,
} from '../../groupUser.slices';
import { PickUserModal } from '../../components/PickUserModal';
import { useEditGroupUser, useEditGroupUserAll } from '../../hooks/useEditGroupUser';
import { DEFAULT_VALUE_SEARCH_USER } from '../../../constants';

export default function FormEditGroupUser() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<IFormCreateGroupUser>({
    resolver: yupResolver(schemaGroupUser),
    defaultValues: DEFAULT_VALUE_GROUP_USER,
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
  const { id: idGroupUser } = useParams();

  const dispatch = useDispatch();
  const { data: dataGroupUser } = useGetGroupUserById(parseInt(idGroupUser as string));

  useEffect(() => {
    dispatch(setIsCheckAll(false));
    dispatch(setDataCheckAllUsers(DEFAULT_VALUE_SEARCH_USER));
  }, []);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const isOpenPickUser = useSelector(isOpenModalPickUserSelector);
  const listUserPicked = useSelector(ListPickUserSelector);
  const isCheckAllUser = useSelector(isCheckAllSelector);
  const dataCheckAllUser = useSelector(dataCheckAllUserSelector);

  const { mutate } = useEditGroupUser({
    onSuccess: () => {
      showSuccessSnackbar(t('groupUser.editSuccess'));
      navigate(PATH_DASHBOARD.userManagement.listGroupUser);
    },
    onError: () => {
      showErrorSnackbar(t('groupUser.editFail'));
    },
  });

  const { mutate: mutateAll } = useEditGroupUserAll({
    onSuccess: () => {
      showSuccessSnackbar(t('groupUser.editSuccess'));
      navigate(PATH_DASHBOARD.userManagement.listGroupUser);
    },
    onError: () => {
      showErrorSnackbar(t('groupUser.editFail'));
    },
  });

  useDeepCompareEffect(() => {
    if (dataGroupUser) {
      const arrayId: number[] = [];
      dataGroupUser?.userGroupToUsers?.forEach((item) => {
        arrayId.push(item.userId);
      });
      dispatch(setListPickedUser(arrayId));
      // reset(dataGroupUser);
      setValue('description', dataGroupUser?.description)
      setValue('status', dataGroupUser?.status === GroupUserStatus.ACTIVE ? true : false);
      setValue('ids', arrayId);
      setValue('nameGroup', dataGroupUser?.name);
    }
  }, [dataGroupUser]);

  const onSubmit = (data: IFormCreateGroupUser) => {
    if (isCheckAllUser) {
      const dataEditGroupUser = {
        id: parseInt(idGroupUser as string),
        data: {
          groupName: data.nameGroup,
          status: data.status ? GroupUserStatus.ACTIVE : GroupUserStatus.INACTIVE,
          description: data.description,
          email: dataCheckAllUser?.email ? dataCheckAllUser.email : undefined,
          phoneNumber: dataCheckAllUser?.phoneNumber
            ? dataCheckAllUser.phoneNumber
            : undefined,
          name: dataCheckAllUser?.name ? dataCheckAllUser.name : undefined,
          accountStatus: dataCheckAllUser.accountStatus
            ? dataCheckAllUser.accountStatus
            : undefined,
          tierCode: dataCheckAllUser?.tierCode ? dataCheckAllUser.tierCode : undefined,
        },
      };
      mutateAll(dataEditGroupUser);
    } else {
      const dataEditGroupUser = {
        id: parseInt(idGroupUser as string),
        data: {
          name: data.nameGroup,
          status: data.status ? GroupUserStatus.ACTIVE : GroupUserStatus.INACTIVE,
          description: data.description,
          ids: data.ids,
        },
      };
      mutate(dataEditGroupUser);
    }
  };
  const handleClickPickUser = () => {
    dispatch(setIsOpenModalPickUser(true));
  };
  useDeepCompareEffect(() => {
    if(!isCheckAllUser)
    setValue('ids', listUserPicked);
  }, [listUserPicked]);

  return (
    <Paper
      sx={{
        boxShadow: 10,
        padding: 3,
      }}
    >
      <PickUserModal
        isOpen={isOpenPickUser}
        onClose={() => dispatch(setIsOpenModalPickUser(false))}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={3}>
          <RHFTextField name="nameGroup" label={t('groupUser.form.groupName')} />
          <RHFTextField name="description" label={t('groupUser.form.desc')} />
          <Stack direction={'row'} spacing={2}>
            {!isCheckAllUser ? (
              <RHFTextField
                name="ids"
                label={t('groupUser.form.listUser')}
                fullWidth
                disabled
              />
            ) : (
              <TextField
                fullWidth
                label={'Thành viên nhóm'}
                value={`Tất cả người dùng ${dataCheckAllUser?.name ? 'có tên ' + dataCheckAllUser?.name : ''} ${
                  dataCheckAllUser?.email ? 'có email ' + dataCheckAllUser?.email : ''
                } ${
                  dataCheckAllUser?.tierCode
                    ? 'có hạng ' + dataCheckAllUser?.tierCode
                    : ''
                } ${
                  dataCheckAllUser?.phoneNumber
                    ? 'có sđt ' + dataCheckAllUser?.phoneNumber
                    : ''
                } ${
                  dataCheckAllUser?.accountStatus
                    ? 'có trạng thái ' + dataCheckAllUser?.accountStatus
                    : ''
                } 
                `}
                disabled
              />
            )}

            <Button
              sx={{ width: '50%' }}
              variant="contained"
              color="primary"
              onClick={handleClickPickUser}
            >
              {t('groupUser.form.pickUser')}
            </Button>
          </Stack>
          <RHFSwitch name="status" label={t('groupUser.form.status')} />
          <Stack justifyContent="flex-end" direction="row" spacing={3}>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => navigate(PATH_DASHBOARD.userManagement.listGroupUser)}
            >
              {`${i18n.t('cancel')}`}
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {`${i18n.t('edit')}`}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
}