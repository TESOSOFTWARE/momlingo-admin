import { Button, FormHelperText, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Iconify from '../../../../common/components/Iconify';
import { RHFSelect } from '../../../../common/components/hook-form';
import { dispatch } from '../../../../common/redux/store';
import { IListTermParams } from '../../../../product-attribute-term-merchant/term-list/interface';
import {
  listForm,
  listTermIds,
  setListForm,
  setListTermIds,
  setTermIdNew,
  termIdNew,
} from '../../slice';
import { useGetAttribute } from '../../../common-variant/hooks/useGetAttribute';
import { useGetAttributeTerm } from '../../../new-variant/hooks/useGetAttributeTerm';
import RHFSelectPaginationAttribute from '../../../common-variant/components/RHFSelectPaginationAttribute';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import RHFSelectPaginationAttributeTerm from './RHFSelectPaginationAttributeTerm';

type SelectAttributeProps = {
  errors: any;
  id: string;
  attributeId: number;
  index: number;
};
export default function SelectAttributeForm({
  errors,
  id,
  attributeId,
  index,
}: SelectAttributeProps) {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext();

  const searchParams: IListTermParams = {
    productAttributeId: attributeId,
    page: 1,
    limit: 20,
  };

  console.log(attributeId);

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

  const {
    dataAttributeTerm,
    isLoadingAttributeTerm,
    fetchNextPageAttributeTerm,
    isFetchingNextPageAttributeTerm,
  } = useGetAttributeTerm(searchParams);
  const listAttributeTerm =
    dataAttributeTerm?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.productAttributeTermDetails[0].value,
          };
        })
      )
      .flat() || [];

  const handleScrollAttributeTerm = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageAttributeTerm();
    }
  };

  const listId = useSelector(listForm);
  const listIds = useSelector(listTermIds);
  const termIds = useSelector(termIdNew);

  const handleClickDelete = (id: string) => {
    const newList = listId.filter((item) => item !== id);
    dispatch(setListForm(newList));
    const newId = listIds.filter(
      (item) => item !== watch(`productAttributeTermId${id}`).id
    );
    dispatch(setListTermIds(newId));
  };

  const handleChange = (e: any) => {
    const termIds = e.target.value;
    dispatch(setTermIdNew(termIds));
    dispatch(setListTermIds([...listIds, termIds]));
  };

  useEffect(() => {
    if (watch(`productAttributeTermId${id}`)) {
      const newListTermIds = listIds.filter(
        (termId) => termId !== watch(`productAttributeTermId${id}`).id
      );
      dispatch(setListTermIds(newListTermIds));
      setValue(`productAttributeTermId${id}`, null);
    }
  }, [attributeId]);

  return (
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
          <RHFSelectPaginationAttribute
            name={`productAttributeId${id}`}
            options={listAttribute}
            labelProp="name"
            label={t('variant.new.labelAttribute')}
            listBoxScroll={handleScrollAttribute}
            loadingScroll={isFetchingNextPageAttribute}
            isLoading={isLoadingAttribute}
            disableClear
            sx={{
              '& .MuiInputBase-root.Mui-disabled': {
                '& .MuiOutlinedInput-notchedOutline': {
                  backgroundColor: 'rgba(103, 99, 101, 0.1)',
                },
              },
            }}
          />

          <RHFSelectPaginationAttributeTerm
            name={`productAttributeTermId${id}`}
            options={listAttributeTerm}
            labelProp="name"
            label={t('variant.new.labelTerm')}
            listBoxScroll={handleScrollAttributeTerm}
            loadingScroll={isFetchingNextPageAttributeTerm}
            isLoading={isLoadingAttributeTerm}
            disableClear
            sx={{
              '& .MuiInputBase-root.Mui-disabled': {
                '& .MuiOutlinedInput-notchedOutline': {
                  backgroundColor: 'rgba(103, 99, 101, 0.1)',
                },
              },
            }}
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
            onClick={() => handleClickDelete(id)}
          >
            <Iconify icon="lucide:trash-2" />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
