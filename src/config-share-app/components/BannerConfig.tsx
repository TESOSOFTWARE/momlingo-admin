import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetMobileRoute } from 'src/config-home/hooks/useGetMobileRoute';
import { IDataRequest } from '../interface';
import { removeSectionItem, setNumberSections } from '../slice';
import ImageSectionCarousel from '../../config-home/components/carousel';
import Iconify from 'src/common/components/Iconify';

export const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function BannerConfig({ item }: { item: IDataRequest }) {
  const navigate = useNavigate();

  const { data } = useGetMobileRoute();

  const dispatch = useDispatch();
  const { id } = item;
  const { listLinkBanner, numberSections } = useSelector((state) => state.configShareApp);
  const isHasImageList = item?.data?.length;

  return (
    <Box
      sx={{
        marginTop: '10px',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Typography
          sx={{
            paddingLeft: 3,
            fontWeight: 550,
            fontSize: '18px',
            color: '#666E80',
          }}
        >
          {item?.title}
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Iconify icon="basil:edit-outline" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.configShareApp.editBanner(id));
            }}
            sx={{ marginRight: '10px', width: '130px' }}
          >
            {'Chỉnh sửa'}
          </Button>

          <Button
            sx={{ marginRight: '10px' }}
            variant="outlined"
            onClick={() => {dispatch(removeSectionItem(id));
                dispatch(setNumberSections(numberSections - 1))}}
            startIcon={<Iconify icon="fluent:delete-24-regular" />}
          >
            Xoá
          </Button>
        </Box>
      </Box>
      <Box>
        {isHasImageList ? (
          <Box>
            <ImageSectionCarousel
              product={item || []}
              actionText={listLinkBanner || []}
              dataRouting={data}
            />
          </Box>
        ) : (
          <Box sx={{ margin: 'auto' }}>
            <Typography>Chưa có ảnh</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
