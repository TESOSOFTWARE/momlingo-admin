import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import Iconify from '../../../../common/components/Iconify';
import { RHFTextField } from '../../../../common/components/hook-form';
import { QUERY_KEYS } from '../../../../common/constants/queryKeys.constant';
import { IDataVariantDetail } from '../../interface';

type SelectAttributeProps = {
  idVariant: number;
};
export default function SelectAttributeFormOld({ idVariant }: SelectAttributeProps) {
  const { t } = useTranslation();

  const client = useQueryClient();
  const queryData = client.getQueryData<IDataVariantDetail>([
    QUERY_KEYS.DETAIL_PRODUCT_VARIANT,
    idVariant,
  ]);

  const listAttributeTermVN =
    queryData?.productAttributeTerms?.map((item) => {
      const productAttributeTermDetails = item.productAttributeTermDetails.filter(
        (term) => term.lang === 'VN'
      );
      return { ...item, productAttributeTermDetails };
    }) || [];

  const handleClickDelete = (idTerm: number) => {
    client.setQueryData([QUERY_KEYS.DETAIL_PRODUCT_VARIANT, idVariant], (old: any) => {
      return {
        ...old,
        productAttributeTerms: queryData?.productAttributeTerms?.filter(
          (item) => item.id !== idTerm
        ),
      };
    });
  };

  return (
    <>
      {listAttributeTermVN?.map((item, index) => (
        <>
          <Typography sx={{ paddingLeft: 3, marginTop: 2, fontStyle: 'italic' }}>
            {t('variant.new.numberAtt')} {index + 1}
          </Typography>
          <Stack direction="row" sx={{ marginTop: 2 }}>
            <Stack
              spacing={2}
              sx={{
                border: '1px solid #2FC96E',
                padding: 3,
                borderRadius: '7px',
                minWidth: '95%',
              }}
            >
              <RHFTextField
                name={`attributeId`}
                label={t('variant.new.labelAttribute')}
                value={item?.productAttribute?.productAttributeDetails[0].name}
                disabled
              />
              <RHFTextField
                name={`attributeTermId`}
                label={t('variant.new.labelTerm')}
                value={item?.productAttributeTermDetails[0].value}
                disabled
              />
            </Stack>

            <Stack
              sx={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'center',
                alightContent: 'center',
                alightItems: 'center',
              }}
            >
              <Button
                color="inherit"
                sx={{
                  fontSize: '25px',
                  display: 'flex',
                  opacity: '0.7',
                  '&:hover': { color: 'red' },
                }}
                onClick={() => handleClickDelete(item.id)}
              >
                <Iconify icon="lucide:trash-2" />
              </Button>
            </Stack>
          </Stack>
        </>
      ))}
    </>
  );
}
