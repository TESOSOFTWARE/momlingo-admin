import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { ModalTitleNormalServiceSchema } from '../../schema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  // editDataRequest,
  saveDataNormalService,
  setTitleForNormalServiceSection,
} from '../../slice';
import { useDispatch } from 'src/common/redux/store';
import useShowSnackbar from '../../../common/hooks/useMessage';

const style = {
  position: 'absolute' as 'const',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
};

export default function NormalServiceModalTitle({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose?: () => void;
  id: string;
}) {
  const methods = useForm({
    resolver: yupResolver(ModalTitleNormalServiceSchema),
  });
  const dispatch = useDispatch();
  const { handleSubmit } = methods;
  const { showSuccessSnackbar } = useShowSnackbar();

  const onSumbit = (data: any) => {
    dispatch(setTitleForNormalServiceSection(data?.title));
    // @ts-ignore
    onClose();
    // dispatch(
    //   editDataRequest({
    //     id,
    //     type: 'NORMAL_SERVICES',
    //   })
    // );
    showSuccessSnackbar('Success');
  };
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSumbit)}>
          <Box sx={style}>
            <Typography textAlign={'center'} marginTop="10px" variant="h6" component="h2">
              Enter your routing for this banner
            </Typography>
            <RHFTextField
              name="title"
              label="Enter your title..."
              sx={{
                width: '70%',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto',
                top: '60px',
              }}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ marginTop: '100px', width: '70%', margin: 'auto' }}
            >
              Save
            </Button>
          </Box>
        </FormProvider>
      </Modal>
    </div>
  );
}
