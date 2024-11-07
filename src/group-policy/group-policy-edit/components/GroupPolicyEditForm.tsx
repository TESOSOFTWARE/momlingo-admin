import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import useDebounce from '../../../winning-history/hooks/useDebounce';
import { GROUP_POLICY_DEFAULT_VALUES } from '../../common/constant';
import { setSearchPoliciesText } from '../../common/group-policy.slice';
import {
  EditGroupPolicyForm,
  IEditGroupPolicy,
  ISearchPoliciesParams,
} from '../../common/interface';
import { groupPolicySchema } from '../../common/schema';
import { useGetListPolicies } from '../../group-policy-create/hooks/useGetListPolicies';
import { useGetGroupPolicyById } from '../hooks/useGetGroupPolicyById';
import { useMutateEditGroupPolicy } from '../hooks/useMutateEditGroupPolicy';
import ListBox from '../../../common/components/ListBoxComponent';

export default function GroupPolicyEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { useDeepCompareEffect } = useDeepEffect();
  const groupPolicyId = parseInt(id as string);
  const { data: groupPolicyData } = useGetGroupPolicyById(groupPolicyId);
  const methods = useForm<EditGroupPolicyForm>({
    resolver: yupResolver(groupPolicySchema),
    defaultValues: GROUP_POLICY_DEFAULT_VALUES,
  });
  useDeepCompareEffect(() => {
    if (groupPolicyData) {
      reset({
        id: groupPolicyId,
        name: groupPolicyData?.name,
        description: groupPolicyData?.description,
        status: groupPolicyData?.status === 'ACTIVE',
        policyIds: groupPolicyData?.policies,
      });
    }
  }, [groupPolicyData]);
  const { searchPoliciesText } = useSelector((state) => state.groupPolicy);

  const dispatch = useDispatch();

  const searchParams: ISearchPoliciesParams = {
    page: 1,
    limit: 20,
  };

  const debouncedSearchText = useDebounce<string>(searchPoliciesText, 500);

  if (debouncedSearchText.length > 2) {
    searchParams.searchText = debouncedSearchText;
  }
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useGetListPolicies(searchParams);

  const listPolicies = data?.pages?.map((item) => item?.items).flat() || [];

  const handleScroll = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPage();
    }
  };
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const { mutate } = useMutateEditGroupPolicy({
    onSuccess: () => {
      showSuccessSnackbar(t('group_policy.edit.success'));
      navigate(PATH_DASHBOARD.groupPolicy.list);
    },
    onError: () => {
      showErrorSnackbar(t('group_policy.edit.fail'));
    },
  });
  const onSubmit = (data: EditGroupPolicyForm) => {
    const dataCreate: IEditGroupPolicy = {
      ...data,
      policyIds: data?.policyIds.map((policy) => policy.id),
      status: data?.status ? 'ACTIVE' : 'IN_ACTIVE',
    };
    mutate(dataCreate);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: 2 }}>
        <Stack spacing={3}>
          <RHFTextField size="medium" name="name" label={t('group_policy.create.name')} />
          <RHFTextField
            size="medium"
            name="description"
            label={t('group_policy.create.description')}
          />
          <RHFSwitch label={t('group_policy.edit.status')} name="status" />
          <Controller
            name="policyIds"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                multiple
                options={listPolicies}
                value={value || []}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                inputValue={searchPoliciesText}
                onInputChange={(event, newInputValue) => {
                  dispatch(setSearchPoliciesText(newInputValue));
                }}
                loading={isFetchingNextPage}
                getOptionLabel={(option) => option?.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                ListboxComponent={ListBox}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('group_policy.create.policies')}
                    placeholder={t('group_policy.create.policies')}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderTags={(value, getTagProps) => {
                  return value.map((val, index) => {
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={val.id}
                        label={val.name}
                        color={(val.actionAbility === 'can' && 'success') || 'error'}
                      />
                    );
                  });
                }}
                ListboxProps={{
                  onScroll: handleScroll,
                }}
              />
            )}
          />
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          onClick={() => navigate(PATH_DASHBOARD.groupPolicy.list)}
        >
          {t('cancel')}
        </Button>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          type="submit"
        >
          {t('Save')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
