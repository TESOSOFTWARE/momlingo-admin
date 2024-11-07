// form
import { useFieldArray, useFormContext } from 'react-hook-form';
// @mui
import { Box, Button, Card, Divider, Stack, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../../common/components/Iconify';
import { RHFSwitch, RHFTextField } from '../../../../common/components/hook-form';
import { DEFAULT_MAIN_COLOR } from '../../../../common/constants/common.constants';
import { useGetProvince } from '../../../../order-management/edit-order/hooks/useGetProvince';
import RHFSearchSelectGameGift from '../RHFSelectProvince';
import RHFSearchSelect from '../../../../common/components/hook-form/RHFSelectSearch';
import { useEffect } from 'react';
import useShowSnackbar from '../../../../common/hooks/useMessage';
import { useParams } from 'react-router-dom';

type Props = {
  disable?: boolean;
};

export default function DetailFormProvinceQuantities({ disable }: Props) {
  const { control, setValue, watch, resetField } = useFormContext();
  const { t } = useTranslation();
  const { id } = useParams();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'gameGiftProvinceQuantities',
  });

  const handleAdd = () => {
    append({
      provinceId: null,
      quantity: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const { data: listProvince } = useGetProvince({
    params: { type: 'PROVINCE', page: 1, limit: 100 },
  });
  const provinceData = listProvince?.items || [];
  let combinedData: any[] = [];
  const { showSuccessSnackbar } = useShowSnackbar();
  useEffect(() => {
    combinedData = [...watch('gameGiftProvinceQuantities')];
  }, [combinedData]);
  const importFile = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        const parsedData = parseCSV(fileData);
        if (parsedData) {
          showSuccessSnackbar('Nhập file thành công');
        }
        for (let item = 0; item < parsedData?.length; item++) {
          const existingIndex = combinedData.findIndex((item2: any) => {
            return item2?.provinceId?.id === parseInt(parsedData[item]?.id);
          });
          if (existingIndex !== -1) {
            setValue(
              `gameGiftProvinceQuantities[${existingIndex}].quantity`,
              parseInt(parsedData[item]?.quantity)
            );
          } else {
            append({
              provinceId: provinceData.find(
                (item1) => item1?.id === parseInt(parsedData[item]?.id)
              ),
              quantity: parseInt(parsedData[item]?.quantity),
            });
          }
        }
        event.target.value = null;
      };
      reader.readAsText(file);
    }
  };
  const parseCSV = (
    csvString: string
  ): {
    [key: string]: string;
  }[] => {
    const lines = csvString.split('\r\n');
    const headers = lines[0].split(',');
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(',');
      if (line.length === headers.length) {
        const obj: {
          [key: string]: string;
        } = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = line[j];
        }
        parsedData.push(obj);
      }
    }

    return parsedData;
  };

  return (
    <Box>
      <Stack spacing={2} direction={'row'} width={'50%'} justifyContent={'center'}>
        <RHFTextField
          name="winRate"
          label={'Tỉ lệ trúng giải*'}
          type="number"
          disabled={disable}
        />
        <RHFSwitch
          name="isWonMultiple"
          label={`Trúng nhiều lần`}
          labelPlacement="start"
          disableSwitch={disable}
          disabled={disable}
        />
      </Stack>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'text.disabled' }}>
        Tỉnh thành áp dụng
      </Typography>

      <Stack p={1} sx={{ borderRadius: '8px' }} spacing={1}>
        {fields?.map((item, index) => (
          <Stack direction="row" spacing={2} sx={{ width: 1 }} key={index}>
            <RHFSearchSelect
              name={`gameGiftProvinceQuantities[${index}].provinceId`}
              options={provinceData}
              labelProp="name"
              label="Tỉnh/Thành"
              disabled={disable}
              disableSelect={disable}
            />
            <RHFTextField
              name={`gameGiftProvinceQuantities[${index}].quantity`}
              type="number"
              label="Số lượng"
              disabled={disable}
            />
            <IconButton
              disabled={disable}
              color="error"
              onClick={() => handleRemove(index)}
              sx={{ backgroundColor: DEFAULT_MAIN_COLOR, borderRadius: '8px' }}
            >
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          variant="contained"
          size="small"
          disabled={disable}
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Thêm Tỉnh thành
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={disable}
          startIcon={<Iconify icon={'mdi:file-import'} />}
          component="label"
        >
          Nhập
          <input hidden multiple type="file" onChange={importFile} accept=".csv,.xlsx" />
        </Button>
      </Stack>
    </Box>
  );
}
