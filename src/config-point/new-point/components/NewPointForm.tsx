import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFSelect } from 'src/common/components/hook-form';
import useMessage from '../../../common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { defaultValuePoint, TypePoint } from '../constant';
import { usePostNewPoint } from '../hooks/usePostNewPoint';
import { INewPoint } from '../interface';
import ButtonForm from './ButtonForm';
import SBPSForm from './SBPSForm';
import SpoonForm from './SpoonForm';

export default function NewPointForm() {
  const methods = useForm<INewPoint>({
    defaultValues: defaultValuePoint,
  });
  const navigate = useNavigate();
  const { handleSubmit, getValues, watch } = methods;

  const [inputValue, setInputValue] = useState<string | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isLoading, isSuccess } = usePostNewPoint({
    onSuccess: () => showSuccessSnackbar(`${vn.ConfigPoint.New.successBar}`),
    onError: () => showErrorSnackbar(`${vn.ConfigPoint.New.failBar}`),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.point.list);
    }
  }, [isSuccess]);

  const onSubmit = (data: INewPoint) => {
    if (inputValue === 'SPOON') {
      const newData: INewPoint = {
        type: inputValue,
        point: data.point,
        code: data.code,
        description: data.description,
        isActive: data.isActive,
        weight: data.weight,
        productGroup: data.productGroup,
      };
      mutate({ data: newData });
    }
    if (inputValue === 'SBPS') {
      const newData: INewPoint = {
        productGroup: data.productGroup,
        weight: data.weight,
        type: inputValue,
        point: data.point,
        code: data.code,
        description: data.description,
        isActive: data.isActive,
      };
      mutate({ data: newData });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: 3, marginBottom: 3 }}>
        <RHFSelect
          name="type"
          label={vn.ConfigPoint.New.labelType}
          onChange={handleChange}
        >
          <option></option>
          {TypePoint.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </RHFSelect>
      </Card>
      {inputValue === 'SPOON' && (
        <>
          <SpoonForm />
          <ButtonForm isLoading={isLoading} />
        </>
      )}
      {inputValue === 'SBPS' && (
        <>
          <SBPSForm />
          <ButtonForm isLoading={isLoading} />
        </>
      )}
    </FormProvider>
  );
}
