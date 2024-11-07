import { TabContext, TabList } from '@mui/lab';
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import { FormProvider, RHFEditor } from '../../../common/components/hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useTranslation } from 'react-i18next';
import Image from '../../../common/components/Image';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';

import { convertToPlain } from '../utils/convertToPlain';
import { useGetNewsById } from '../../news-edit/hooks/useGetNewsById';
import { DEFAULT_VALUE_FORM_NEWS } from '../../news-common/constant';
import { NewsStatus } from '../../news-common/interface';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

function NewsDetailForm() {
  const [openLightbox, setOpenLightbox] = useState(false);

  const { t } = useTranslation();
  const methods = useForm<any>({
    defaultValues: DEFAULT_VALUE_FORM_NEWS,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const params = useParams();
  const idDetail = params?.id;

  const { data: detailNews } = useGetNewsById(parseInt(idDetail as string));
  const imageShow = detailNews?.thumbnail?.url || '';
  const status = detailNews?.status || 'ACTIVE';
  const listNameSubject =
    detailNews?.subject
      ?.map((subjectItem) => subjectItem?.subjectDetails[0]?.name)
      .join(', ') || '';
  const plainDescription = convertToPlain(detailNews?.newsDetails[0]?.content);

  useEffect(() => {
    if (detailNews) {
      setValue('content', detailNews?.newsDetails[0]?.content);
    }
  }, [detailNews]);

  return (
    <FormProvider methods={methods}>
      <Paper elevation={3} sx={{ position: 'relative', pt: 0 }}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={12}>
            <Image
              alt="large image"
              src={imageShow}
              ratio="21/9"
              onClick={() => {
                setOpenLightbox(true);
              }}
              sx={{ cursor: 'zoom-in', borderRadius: '8px' }}
            />
            <Modal
              open={openLightbox}
              onClose={() => {
                setOpenLightbox(false);
              }}
            >
              <Box sx={style}>
                <Image alt="large image" src={imageShow} />
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="center">
                <Typography variant="h3">{detailNews?.title} </Typography>
              </Stack>

              <Grid container rowSpacing={2}>
                <Grid item xs={2}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {t('news.detail.labelAuthor')}
                  </FormLabel>
                </Grid>
                <Grid item xs={10}>
                  <Typography>{detailNews?.newsDetails[0]?.author}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {t('news.detail.labelSubject')}
                  </FormLabel>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">{listNameSubject}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {t('news.detail.labelStatus')}
                  </FormLabel>
                </Grid>
                <Grid item xs={10}>
                  <Chip
                    label={status}
                    sx={{
                      color: 'white',
                      minWidth: '100px',
                      fontWeight: 900,
                      borderRadius: '5px',
                      background:
                        status === NewsStatus.ACTIVE
                          ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                          : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
                    }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {t('news.detail.labelLang')}
                  </FormLabel>
                </Grid>
                <Grid item xs={10}>
                  <Typography>{detailNews?.newsDetails[0]?.lang}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {t('news.detail.labelDescription')}
                  </FormLabel>
                </Grid>
                <Grid item xs={10}>
                  <Typography>{detailNews?.newsDetails[0]?.description}</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ marginTop: 2 }}>
        <RHFEditor name="content" disabled />
      </Paper>

      <Stack marginTop={2} direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate(PATH_DASHBOARD.news.list)}
        >
          Trở về
        </Button>
        <Button
          onClick={() => {
            navigate(replacePathParams(PATH_DASHBOARD.news.edit, { id: idDetail }));
          }}
          variant="contained"
        >
          {t('edit')}
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default NewsDetailForm;
