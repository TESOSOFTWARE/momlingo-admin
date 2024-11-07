/* eslint-disable react/jsx-key */
import * as React from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  setIsOpenModalPreviewWheel,
  setProductList,
  handleAddNewRow,
  setRowValue,
  handleRemoveRow,
} from '../reducer';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import WheelName from './ConfigWheelTableHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { configWheelSchema } from '../configWheel.schema';
import { useTranslation } from 'react-i18next';
import { IFormCreateNewWheel, ProductType } from '../interface';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateNewWheel } from '../hooks/useCreateNewWheel';
import useMessage from 'src/common/hooks/useMessage';
import PreviewWheelModal from '../../spinning-wheel/components/WheelModalPreview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormProvider from '../../../common/components/hook-form/FormProvider';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useGetProductList } from '../hooks/useGetProductList';

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
const today = new Date();
const maximumRow = 8;

export default function ConfigWheelTable() {
  const { t } = useTranslation();
  const { mutate } = useCreateNewWheel();
  const { data } = useGetProductList();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const methods = useForm<IFormCreateNewWheel>({
    resolver: yupResolver(configWheelSchema),
    defaultValues: {
      endDateWheel: tomorrow,
      startDateWheel: today,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch();

  const imageFile = useSelector((state) => state.wheelReducer.fileImage);
  const { productList, fields, status, isOpenModalPreviewWheel, productVariant } =
    useSelector((state) => state.configWheelReducer);
  const giftIsNotAvailable = [{ label: t('giftIsNotAvailable') }];
  const productVariantNotAvailable = [{ label: 'Biến thể sản phẩm không tồn tại!' }];

  const columns: GridColumns = [
    {
      field: 'productId',
      headerName: 'Sản phẩm',
      flex: 1,
      editable: true,
      sortable: false,
      type: 'singleSelect',
      valueOptions: productList || giftIsNotAvailable,
    },
    {
      field: 'productVariantId',
      headerName: 'Biến thể sản phẩm',
      flex: 1,
      editable: true,
      sortable: false,
      type: 'singleSelect',
      valueOptions: productVariant || productVariantNotAvailable,
    },
    {
      field: 'amount',
      headerName: t('quantity'),
      type: 'number',
      editable: true,
      flex: 1,
      sortable: false,
    },
    {
      field: 'winRate',
      headerName: t('winningRate'),
      type: 'number',
      editable: true,
      flex: 1,
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      sortable: false,
      getActions: ({ id }) => {
        return [
          //  @ts-ignore
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            onClick={() => {
              dispatch(handleRemoveRow(id));
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleClickAddNewRow = () => {
    const newRow = {
      id: uuid(),
      amount: null,
      winRate: null,
      productId: '',
      type: '',
    };

    if (fields?.length < maximumRow) dispatch(handleAddNewRow(newRow));
  };

  const onSubmit = (data: IFormCreateNewWheel) => {
    if (!imageFile?.id) {
      showErrorSnackbar(t('imageIsNotUploaded'));
      return;
    }

    const dataCreateNewWheel = {
      name: data?.wheelName,
      startDate: new Date(data?.startDateWheel).toISOString(),
      endDate: new Date(data?.endDateWheel).toISOString(),
      status,
      imageId: imageFile?.id as number,
      eventGiftDtos: fields?.map((field) => {
        const { id, type, ...restInfo } = field;
        return restInfo;
      }),
    };
    mutate(dataCreateNewWheel, {
      onSuccess: () => {
        navigate(PATH_DASHBOARD.event.list);
        showSuccessSnackbar(t('createNewWheelSuccess'));
      },
      onError: () => {
        showErrorSnackbar(t('createNewWheelFailed'));
      },
    });
  };
  React.useEffect(() => {
    // @ts-ignore
    dispatch(setProductList(data?.items));
    // @ts-ignore
  }, [data?.items]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <HeaderBreadcrumbs
          heading={t('titleConfigWheel')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('configWheel'), href: PATH_DASHBOARD.configWheel.create },
            { name: t('create') },
          ]}
        />
        <Box>
          <Button
            sx={{ marginRight: '10px' }}
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => dispatch(setIsOpenModalPreviewWheel(true))}
          >
            {t('previewWheel')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleClickAddNewRow}
          >
            {t('addNewRow')}
          </Button>
        </Box>
      </Box>
      <WheelName control={control} errors={errors} />

      <DataGrid
        rows={fields}
        columns={columns}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={(newRow) => {
          // @ts-ignore
          const productItemEditing = data?.items?.find(
            // @ts-ignore
            (item) => item?.id === newRow?.productId
          );
          if (
            productItemEditing?.type === ProductType.BUNDLE ||
            productItemEditing?.type === ProductType.GROUPED
          ) {
            const { productVariantId, ...rest } = newRow;
            dispatch(
              setRowValue({
                data: rest,
                type: productItemEditing?.type,
              })
            );
            return;
          }
          const { productId, ...rest } = newRow;
          dispatch(
            setRowValue({
              data: rest,
              type: productItemEditing?.type,
            })
          );
        }}
        autoHeight
        disableColumnMenu={true}
        disableColumnSelector={true}
        hideFooter={true}
        showCellRightBorder={true}
        sx={{
          boxShadow: 2,
          marginTop: '20px',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          sx={{
            width: '100px',
            marginTop: '10px',
            marginLeft: '20px',
            color: 'grey.0',
          }}
        >
          {t('submit')}
        </Button>
      </Box>
      {isOpenModalPreviewWheel && (
        <PreviewWheelModal
          onClose={() => dispatch(setIsOpenModalPreviewWheel(false))}
          isOpen={isOpenModalPreviewWheel}
        />
      )}
    </FormProvider>
  );
}
