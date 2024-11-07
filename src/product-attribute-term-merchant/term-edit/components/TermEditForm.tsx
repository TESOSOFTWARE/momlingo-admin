import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Divider, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { RHFSelectPaginationAttribute } from '../../term-common/components/RHFSelectPaginationAttribute';
import { getAttribute } from '../../term-common/service';
import { defaultValueNewTerm, selectLang } from '../../term-new/constants';
import { useGetTermById } from '../hooks/useGetTermById';
import { usePutTerm } from '../hooks/usePutTerm';
import {
  IConvertTermData,
  IProductAttributeTermDetail,
  IPutAttributeTerm,
} from '../interface';
import { isToggled, setToggled } from '../slice';
import { EditTermSchema } from '../schema/schema';
import { getValue } from '@mui/system';
import RHFSelectPagination from '../../term-common/components/RHFSelectPagination';
import { useGetAttribute } from '../../term-common/hooks/useGetAttribute';

export default function TermEditForm() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<IConvertTermData>({
    resolver: yupResolver(EditTermSchema),
    defaultValues: defaultValueNewTerm,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const { t } = useTranslation();
  const params = useParams();
  const idSelect = params?.id as unknown as number;

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

  useEffect(() => {
    if (showToggled === true) {
      setValue('another', true);
    } else setValue('another', false);
  }, [showToggled]);

  const handleMoreValue = () => {
    dispatch(setToggled(!showToggled));
  };

  const { data: termDetail } = useGetTermById(idSelect);

  useDeepCompareEffect(() => {
    if (termDetail !== undefined) {
      if (termDetail.productAttributeTermDetails.length > 1) {
        dispatch(setToggled(true));
      } else dispatch(setToggled(false));
    }
    if (termDetail) {
      reset({
        productAttributeId: {
          id: termDetail.productAttribute.id,
          name: termDetail.productAttribute.productAttributeDetails[0].name,
        },
        lang: termDetail.productAttributeTermDetails[0].lang,
        term: termDetail.productAttributeTermDetails[0].value,
        lang2: termDetail.productAttributeTermDetails[1]?.lang,
        term2: termDetail.productAttributeTermDetails[1]?.value,
      });
    }
  }, [termDetail]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess, isLoading } = usePutTerm({
    onSuccess: () => showSuccessSnackbar(t('term.edit.editSuccess')),
    onError: () => {
      if (watch('lang') === watch('lang2')) {
        showErrorSnackbar('Vui lòng chọn ngôn ngữ khác');
      } else showErrorSnackbar(t('term.new.newFail'));
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.product_attribute_term.list);
  }, [isSuccess]);

  const onSubmit = (dataForm: IConvertTermData) => {
    const productAttributeTermDetails: IProductAttributeTermDetail[] = [
      {
        lang: dataForm.lang,
        value: dataForm.term,
      },
    ];
    if (showToggled === true) {
      productAttributeTermDetails.push({
        lang: dataForm.lang2 || '',
        value: dataForm.term2 || '',
      });
    }

    const newData: IPutAttributeTerm = {
      id: idSelect,
      productAttributeId: dataForm.productAttributeId.id,
      productAttributeTermDetails,
    };

    mutate({ data: newData });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack direction="column" spacing={3}>
            <RHFSelectPagination
              name="productAttributeId"
              options={listAttribute}
              labelProp="name"
              label={t('term.edit.labelAttribute')}
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
                <RHFSelect name="lang" label={t('term.edit.labelLang')}>
                  {selectLang.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name="term"
                  label={t('term.edit.labelTerm')}
                  sx={{ backgroundColor: 'white', zIndex: 0 }}
                  InputLabelProps={{ shrink: true }}
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
                  {showToggled
                    ? `${t('term.edit.labelBtnRemove')}`
                    : `${t('term.edit.labelBtnAdd')}`}
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
                    <RHFTextField
                      name="term2"
                      label="Value"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        <Stack
          direction={'row'}
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 3,
            marginRight: 5,
          }}
        >
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            {t('saveChange')}
          </LoadingButton>
          <Button
            color={'inherit'}
            variant="contained"
            onClick={() => navigate(PATH_DASHBOARD.product_attribute_term.list)}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
