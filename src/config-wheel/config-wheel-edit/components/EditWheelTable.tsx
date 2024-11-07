import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import PreviewWheelModal from '../../spinning-wheel/components/WheelModalPreview';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import FormProvider from '../../../common/components/hook-form/FormProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  handleRemoveRow,
  setFields,
  setGiftList,
  setIsOpenWheelImageModal,
  setRowValue,
} from '../reducer';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetWheelDetail } from '../hooks/useGetWheelDetail';
import { useEffect } from 'react';
import { useGetGiftList } from '../../config-wheel-create/hooks/useGetGiftList';
import EditWheelTableHeader from './EditWheelTableHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { editWheelSchema } from '../editWheel.schema';
import { IFormEditWheel } from '../interface';
import { useEditWheel } from '../hooks/useEditWheel';
import useMessage from 'src/common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

const pageGiftList = 1;

export default function EditWheelTable() {
  const dispatch = useDispatch();
  const { key } = useParams();
  const { t } = useTranslation();
  const methods = useForm<IFormEditWheel>({
    resolver: yupResolver(editWheelSchema),
  });
  const { data } = useGetWheelDetail(key);
  const { data: giftList } = useGetGiftList(pageGiftList);
  const { mutate } = useEditWheel();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;
  const navigate = useNavigate();
  const fields = useSelector((state) => state.editWheelReducer.fields);
  const isOpenWheelImageModal = useSelector(
    (state) => state.editWheelReducer.isOpenWheelImageModal
  );
  const gifts = useSelector((state) => state.editWheelReducer.giftList);
  const imageFile = useSelector((state) => state.wheelReducer.fileImage);
  const status = useSelector((state) => state.editWheelReducer.status);

  const columns: GridColumns = [
    {
      field: 'giftId',
      headerName: t('giftName'),
      flex: 1,
      editable: true,
      sortable: false,
      type: 'singleSelect',
      valueOptions: gifts,
      valueGetter(params) {
        const giftItem = gifts?.find((item) => params?.value === item?.value);
        return giftItem?.label;
      },
    },
    {
      field: 'giftCode',
      headerName: t('giftCode'),
      type: 'number',
      editable: true,
      flex: 1,
      sortable: false,
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
              dispatch(handleRemoveRow(Number(id)));
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(setFields(data?.eventGifts));
  }, [data?.eventGifts]);
  useEffect(() => {
    //  @ts-ignore
    dispatch(setGiftList(giftList?.items));
  }, [giftList]);

  const onSubmit = (dataForm: IFormEditWheel) => {
    const editedDataWheel = {
      id: data?.id,
      name: dataForm?.editWheelName,
      status,
      startDate: new Date(dataForm?.editStartDateWheel).toISOString(),
      endDate: new Date(dataForm?.editEndDateWheel).toISOString(),
      imageId: data?.imageId || imageFile?.id,
      eventGiftDtos: fields?.map((item) => {
        const isIdOfOldRow = typeof item?.id === 'number';
        return {
          id: isIdOfOldRow ? item.id : null,
          winRate: Number(item?.winRate),
          amount: Number(item?.amount),
          ordinal: Number(item?.ordinal),
          giftId: Number(item?.giftId),
        };
      }),
    };
    mutate(editedDataWheel, {
      onSuccess: () => {
        showSuccessSnackbar(t('editWheelSuccess'));
        navigate(PATH_DASHBOARD.event.list);
      },
      onError: () => showErrorSnackbar(t('editWheelError')),
    });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <EditWheelTableHeader
        data={data}
        control={control}
        setValue={setValue}
        errors={errors}
      />

      <>
        <DataGrid
          rows={fields || []}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={(row) => dispatch(setRowValue(row))}
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
        {isOpenWheelImageModal && (
          <PreviewWheelModal
            onClose={() => {
              dispatch(setIsOpenWheelImageModal(false));
            }}
            isOpen={isOpenWheelImageModal}
            editWheelImage={data?.image?.url}
          />
        )}
      </>
    </FormProvider>
  );
}
