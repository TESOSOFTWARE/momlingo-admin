import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Divider, FormHelperText, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { RHFSelectPaginationAttribute } from '../../term-common/components/RHFSelectPaginationAttribute';
import { getAttribute } from '../../term-common/service';
import { defaultValueNewTerm, selectLang } from '../constants';
import { usePostAttributeTerm } from '../hooks/usePostAttributeTerm';
import { IAttributeTerm, ISubmitAttributeTerm } from '../interface';
import { AttributeTermSchema } from '../schema/schema';
import { isToggled, setToggled } from '../slice';
import { useEffect } from 'react';
import { useGetAttribute } from '../../term-common/hooks/useGetAttribute';
import RHFSelectPagination from '../../term-common/components/RHFSelectPagination';

export function NewTermForm() {
  const navigate = useNavigate();
  const methods = useForm<ISubmitAttributeTerm>({
    resolver: yupResolver(AttributeTermSchema),
    defaultValues: defaultValueNewTerm,
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const { t } = useTranslation();
  const showToggled = useSelector(isToggled);

  const {
    dataAttribute,
    isLoadingAttribute,
    fetchNextPageAttribute,
    isFetchingNextPageAttribute,
  } = useGetAttribute({ page: 1, limit: 20 });

  const listAttribute =
    dataAttribute?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.productAttributeDetails[0].name,
          };
        })
      )
      .flat() || [];

  const handleScrollAttribute = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageAttribute();
    }
  };

  const handleMoreValue = () => {
    dispatch(setToggled(!showToggled));
  };

  useEffect(() => {
    if (showToggled === true) {
      setValue('another', true);
    } else setValue('another', false);
  }, [showToggled]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isLoading } = usePostAttributeTerm({
    onSuccess: () => {
      showSuccessSnackbar(t('term.new.newSuccess'));
      navigate(PATH_DASHBOARD.product_attribute_term.list);
      dispatch(setToggled(false));
    },
    onError: () => {
      if (watch('lang') === watch('lang2')) {
        showErrorSnackbar('Vui lòng chọn ngôn ngữ khác');
      } else showErrorSnackbar(t('term.new.newFail'));
    },
  });
  const onSubmit = (dataForm: ISubmitAttributeTerm) => {
    const newData: IAttributeTerm = {
      productAttributeId: dataForm.productAttributeId.id,
      productAttributeTermDetails: [
        {
          lang: dataForm.lang,
          value: dataForm.value,
        },
      ],
    };

    if (showToggled === true) {
      newData.productAttributeTermDetails.push({
        lang: dataForm.lang2 || '',
        value: dataForm.value2 || '',
      });
    }

    mutate({ data: newData });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack>
            <RHFSelectPagination
              name="productAttributeId"
              options={listAttribute}
              labelProp="name"
              label={t('term.new.labelAttribute')}
              listBoxScroll={handleScrollAttribute}
              loadingScroll={isFetchingNextPageAttribute}
              isLoading={isLoadingAttribute}
              sx={{
                '& .MuiInputBase-root.Mui-disabled': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    backgroundColor: 'rgba(103, 99, 101, 0.1)',
                  },
                },
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Divider orientation="vertical" flexItem>
              T <br />
              E <br />
              R <br />
              M <br />
            </Divider>

            <Stack
              spacing={1}
              sx={{
                border: '1px solid #00000033',
                padding: 3,
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
              }}
            >
              <RHFSelect name="lang" label={t('term.new.labelLang')}>
                {selectLang.map((item, index) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="value"
                label={t('term.new.labelTerm')}
                sx={{ backgroundColor: 'white', zIndex: 0 }}
              />

              <Button
                onClick={handleMoreValue}
                color={showToggled ? 'error' : 'secondary'}
                sx={{ width: '50%', border: '1px dotted black', alignSelf: 'center' }}
                startIcon={
                  showToggled ? (
                    <Iconify icon="ic:baseline-remove" />
                  ) : (
                    <Iconify icon="material-symbols:add" />
                  )
                }
              >
                {showToggled ? t('term.new.labelBtnRemove') : t('term.new.labelBtnAdd')}
              </Button>

              {showToggled && (
                <Stack spacing={1} sx={{ borderRadius: '5px' }}>
                  <RHFSelect name="lang2" label={t('term.new.labelLang')}>
                    {selectLang.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="value2" label={t('term.new.labelLang')} />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Stack
        direction={'row'}
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, marginRight: 5 }}
      >
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
        >
          {t('term.new.addBtn')}
        </LoadingButton>
        <Button
          color={'inherit'}
          variant="contained"
          onClick={() => navigate(PATH_DASHBOARD.product_attribute_term.list)}
          startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
