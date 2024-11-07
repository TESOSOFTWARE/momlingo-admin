import { Box } from '@mui/material';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { getImageFile } from '../reducer';
import '../styles/index.css';
import { useDropzone } from 'react-dropzone';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IUploadFile } from '../interface';
import UploadIcon from '@mui/icons-material/Upload';
import { LoadingButton } from '@mui/lab';

const defaultBgImageWheel = 'https://amymhaddad.s3.amazonaws.com/morocco-blue.png';
interface WheelComponentProps {
  editWheelImage?: string;
}

export default function WheelComponent({ editWheelImage }: WheelComponentProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const imageFile = useSelector((state) => state.wheelReducer.fileImage);

  const { handleUpload, isUploading } = usePresignImg();
  // @ts-ignore
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (item: IUploadFile) => {
      // @ts-ignore
      const file = await handleUpload(item);
      dispatch(getImageFile(file));
    });
  }, []);
  const { getRootProps, open } = useDropzone({ onDrop });
  return (
    <>
      <div
        {...getRootProps({
          className: 'wheel-container',
        })}
        style={{
          backgroundImage: `url(${
            imageFile?.url || editWheelImage || defaultBgImageWheel
          })`,
          backgroundSize: 'contain',
        }}
      ></div>
      <Box
        sx={{
          display: 'flex',
          marginTop: '10px',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <LoadingButton
          size="small"
          onClick={open}
          loading={isUploading}
          variant="outlined"
          startIcon={<UploadIcon />}
        >
          {t('uploadBgImageWheel')}
        </LoadingButton>
      </Box>
    </>
  );
}
