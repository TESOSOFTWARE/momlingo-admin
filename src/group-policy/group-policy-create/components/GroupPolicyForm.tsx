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
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import useMessage from '../../../common/hooks/useMessage';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import useDebounce from '../../../winning-history/hooks/useDebounce';
import { GROUP_POLICY_DEFAULT_VALUES } from '../../common/constant';
import { setSearchPoliciesText } from '../../common/group-policy.slice';
import { CreateGroupPolicyForm, ISearchPoliciesParams } from '../../common/interface';
import { groupPolicySchema } from '../../common/schema';
import { useGetListPolicies } from '../hooks/useGetListPolicies';
import { useMutateCreateGroupPolicy } from '../hooks/useMutateCreateGroupPolicies';
import ListBox from '../../../common/components/ListBoxComponent';

export default function GroupPolicyForm() {
  const navigate = useNavigate();

  const methods = useForm<CreateGroupPolicyForm>({
    resolver: yupResolver(groupPolicySchema),
    defaultValues: GROUP_POLICY_DEFAULT_VALUES,
  });

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
  const { mutate } = useMutateCreateGroupPolicy({
    onSuccess: () => {
      showSuccessSnackbar(t('group_policy.create.success'));
      navigate(PATH_DASHBOARD.groupPolicy.list);
    },
    onError: () => {
      showErrorSnackbar(t('group_policy.create.fail'));
    },
  });

  const onSubmit = (data: CreateGroupPolicyForm) => {
    const dataCreate = {
      ...data,
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
          <Controller
            name="policyIds"
            control={control}
            render={({ fieldState: { error } }) => (
              <Autocomplete
                multiple
                options={listPolicies}
                // value={value}
                onChange={(event, newValue) =>
                  setValue(
                    'policyIds',
                    newValue.map((value) => value.id)
                  )
                }
                inputValue={searchPoliciesText}
                onInputChange={(event, newInputValue) => {
                  dispatch(setSearchPoliciesText(newInputValue));
                }}
                ListboxComponent={ListBox}
                loading={isFetchingNextPage}
                getOptionLabel={(option) => option?.name}
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
