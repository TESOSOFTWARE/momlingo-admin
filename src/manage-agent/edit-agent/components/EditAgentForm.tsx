import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Divider,
  FormHelperText,
  FormLabel,
  Stack,
} from '@mui/material';
import lodash from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { RHFSelectPagitnationPolicy } from '../../common/components/RHFSelectPaginationPolicy';
import { getPolicy } from '../../common/service';
import { renderNull } from '../../common/utils/renderNull';
import { renderRank } from '../../common/utils/renderRank';
import { StatusLabel } from '../constant';
import { useGetAgentById } from '../hooks/useGetAgentById';
import { usePutAgent } from '../hooks/usePutAgent';
import { IEditAgent, IShowAgent } from '../interface';
import { editAgentSchema } from '../schema/schema';

export default function EditAgentForm() {
  const params = useParams();
  const idSelect = params?.id as unknown as number;

  const { t } = useTranslation();
  const navigation = useNavigate();

  const methods = useForm<IShowAgent>({
    resolver: yupResolver(editAgentSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { data: detailAgent } = useGetAgentById(idSelect);
  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    if (detailAgent) {
      reset({
        id: detailAgent.id,
        name: renderNull(detailAgent.name),
        email: detailAgent.email,
        address: renderNull(detailAgent.address),
        phoneNumber: renderNull(detailAgent.phoneNumber),
        rank: detailAgent.rank,
        status: detailAgent.status,
        policy: detailAgent.user.groupPolicies.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        }),
      });
    }
  }, [detailAgent]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = usePutAgent({
    onSuccess: () => {
      showSuccessSnackbar(t('manageAgent.edit.successBar')),
        navigation(PATH_DASHBOARD.manageAgent.list);
    },
    onError: () => showErrorSnackbar(t('manageAgent.edit.failBar')),
  });

  const onSubmit = (data: IShowAgent) => {
    const editData: IEditAgent = {
      id: data.id,
      status: data.status,
      groupPolicyIds: data.policy.map((item) => item.value),
    };
    mutate({ data: editData });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1}>
          <Card
            sx={{
              padding: 2,
              minWidth: '260px',
              minHeight: '260px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: 'linear-gradient(to right, #005689, #43cea2)',
            }}
          >
            <Box
              component="img"
              sx={{
                height: 220,
                width: 220,
                borderRadius: '7px',
                objectFit: 'cover',
              }}
              alt={
                lodash.isEmpty(detailAgent?.avatar)
                  ? `no-images`
                  : `${detailAgent?.avatar.key}`
              }
              src={
                lodash.isEmpty(detailAgent?.avatar)
                  ? `no-images`
                  : `${detailAgent?.avatar.url}`
              }
            />
          </Card>
          <FormLabel sx={{ alignSelf: 'center' }}>
            {t('manageAgent.edit.id')}: {detailAgent?.id}
          </FormLabel>
          <Divider />
          <FormLabel sx={{ alignSelf: 'center' }}>
            {t('manageAgent.edit.rank')}: {renderRank(detailAgent?.rank)}
          </FormLabel>
        </Stack>

        <Card sx={{ padding: 3, width: '100%' }}>
          <Stack spacing={3}>
            <Stack direction="column" spacing={1}>
              <RHFSelectPagitnationPolicy
                name={'policy'}
                getAsyncData={getPolicy}
                placeholder={t('manageAgent.edit.policy')}
                error={errors}
              />
              <FormHelperText sx={{ color: 'red', paddingLeft: '17px' }}>
                {errors?.policy?.message}
              </FormHelperText>
            </Stack>

            <RHFTextField
              name="name"
              label={t('manageAgent.edit.name')}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="email"
              label={t('manageAgent.edit.email')}
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <RHFTextField
              name="address"
              label={t('manageAgent.edit.address')}
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <Stack direction="row" spacing={3}>
              <RHFTextField
                name="phoneNumber"
                label={t('manageAgent.edit.phone')}
                InputLabelProps={{ shrink: true }}
                disabled
              />
              <RHFSelect name="status" label={t('manageAgent.edit.status')}>
                {StatusLabel.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </Stack>
        </Card>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}
      >
        <LoadingButton
          variant="contained"
          startIcon={<Iconify icon="mdi:content-save-all-outline" />}
          type="submit"
          loading={isLoading}
        >
          {t('saveChange')}
        </LoadingButton>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="ph:x-circle" />}
          onClick={() => navigation(PATH_DASHBOARD.manageAgent.list)}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
