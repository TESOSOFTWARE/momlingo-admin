import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { ModalLinkModalService } from '../../schema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  editNormalServiceImage,
  saveDataNormalService,
  setHasReplaceImage,
  setLinkForBanner,
  setLinkForNormalService,
} from '../../slice';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { RHFSelect } from 'src/common/components/hook-form';

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
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
};

export default function BannerLinkModal({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose?: () => void;
  id: string;
}) {
  const methods = useForm({
    resolver: yupResolver(ModalLinkModalService),
  });
  const dispatch = useDispatch();
  const { handleSubmit } = methods;
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(QUERY_KEYS.GET_MOBILE_ROUTE);
  const hasReplaceImage = useSelector(
    (state) => state.homeConfigurationReducer.hasReplaceImage
  );

  const onSumbit = (data: any) => {
    dispatch(
      setLinkForNormalService({ link: data?.routing, name: data?.nameService, id })
    );
    if (hasReplaceImage) {
      dispatch(editNormalServiceImage());
    } else {
      dispatch(saveDataNormalService());
    }
    dispatch(setHasReplaceImage(false));
    // @ts-ignore
    onClose();
  };
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSumbit)}>
          <Box sx={style}>
            <Typography textAlign={'center'} marginTop="10px" variant="h6" component="h2">
              Enter your routing and service name for this service
            </Typography>
            <Box
              sx={{
                width: '70%',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto',
                top: '60px',
              }}
            >
              <RHFSelect name="routing" label="Select your routing">
                {/* @ts-ignore */}
                {data?.map((item: any, index: any) => (
                  <option key={index} value={item?.route}>
                    {item?.name}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <RHFTextField
              name="nameService"
              label="Name"
              sx={{
                width: '70%',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto',
                marginTop: '150px',
              }}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ marginTop: '400px', width: '70%', margin: 'auto' }}
            >
              Save
            </Button>
          </Box>
        </FormProvider>
      </Modal>
    </div>
  );
}
