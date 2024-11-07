import { Button, Stack, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { agentRank, agentStatus, defaultValueFilter } from '../constant';
import { IListAgentParams } from '../interface';
import { setDataFilter } from '../slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function ListAgentFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
  const methods = useForm<IListAgentParams>();

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: IListAgentParams) => {
    const filterData: IListAgentParams = {
      status: data.status === agentStatus[0].label ? undefined : data.status,
      // rank: data.rank === agentRank[0].label ? undefined : data.rank,
      searchText: data.searchText,
    };
    onSetPage(0);
    dispatch(setDataFilter(filterData));
  };

  const handleClearClick = () => {
    reset({
      status: agentStatus[0].label,
      // rank: agentRank[0].label,
      searchText: '',
    });
    dispatch(setDataFilter(defaultValueFilter));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3} sx={{ padding: 3 }}>
        <RHFTextField
          name="searchText"
          label={t('manageAgent.list.labelSearch')}
          size="small"
        />
        <RHFSelect
          name="status"
          label={t('manageAgent.list.labelStatus')}
          size="small"
          SelectProps={{ native: false }}
        >
          <MenuItem value={undefined} disabled />
          {agentStatus?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </RHFSelect>
        {/* <RHFSelect name="rank" label={t('manageAgent.list.labelRank')} size="small">
          {agentRank.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </RHFSelect> */}
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 3,
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Iconify icon="ic:outline-search" />}
          type="submit"
        >
          {t('search')}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mdi:delete-circle-outline" />}
          onClick={handleClearClick}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
