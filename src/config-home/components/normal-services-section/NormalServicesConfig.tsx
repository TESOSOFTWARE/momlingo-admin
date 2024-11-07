import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/common/redux/store';
import Image from '../../../common/components/Image';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IDataRequest } from '../../interface';
import { removeSectionItem } from '../../slice';
import Iconify from '../../../common/components/Iconify';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function BannerAndServiceConfig({
  id,
  item,
}: {
  id: string;
  item: IDataRequest;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              navigate(PATH_DASHBOARD.homeConfig.editNormalService(id));
            }}
            sx={{ marginRight: '10px', width: '130px' }}
          >
            {'Chỉnh sửa'}
          </Button>

          <Button
            variant="outlined"
            sx={{ marginRight: '10px' }}
            startIcon={<Iconify icon="fluent:delete-24-regular" />}
            onClick={() => dispatch(removeSectionItem(id))}
          >
            Xoá
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {item?.data?.map((normalService: any) => (
          <Box
            key={normalService?.id}
            sx={{
              borderRadius: '118px',
              padding: '15px',
              width: '110px',
              height: '200px',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: ' 15px',
              marginTop: '26px',
              border: 2,
              borderColor: '#F7F8FA',
            }}
          >
            <Image
              src={normalService.image}
              sx={{
                width: '82px',
                height: '82px',
                borderRadius: '50%',
              }}
              alt="normal-service"
            />
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: '14px',
                color: '#666E80',
              }}
            >
              {normalService.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
