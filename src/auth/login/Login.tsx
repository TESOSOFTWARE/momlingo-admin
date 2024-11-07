import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
} from '@mui/material';
import useAuth from 'src/common/hooks/useAuth';
import Page from 'src/common/components/Page';
import Image from 'src/common/components/Image';
import LoginForm from './component/LoginForm';
import { PATH_AUTH } from 'src/common/routes/paths';
import useResponsive from 'src/common/hooks/useResponsive';
import { useSelector } from 'react-redux';
import { isExpiredSelector, setIsExpired } from './login.slice';
import { useEffect } from 'react';
import {
  default as useMessage,
  default as useShowSnackbar,
} from 'src/common/hooks/useMessage';
import vn from '../../common/locales/vn';
import { dispatch } from '../../common/redux/store';
import { BASE_PATH_DEPLOY, CONFIG_APP_DETAIL } from '../../config';
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '646px',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding: '0!important',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  // minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const expired = useSelector(isExpiredSelector);
  useEffect(() => {
    if (expired) {
      showErrorSnackbar(vn.expired);
      dispatch(setIsExpired(false));
    }
  }, [expired]);

  return (
    <Page title="Login" sx={{background:'#29adb2c7', display:'flex', alignItems:'center', justifyContent:'center', height:'fix-content'}}>
      <RootStyle sx={{
        width: '80%',
        minHeight:'500px',
        margin: '10vh 0px',
        height: '80vh',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
        borderRadius:'20px',
        background:'#fff'
      }}>
        {mdUp && (
          <SectionStyle>
            <Image
              // sx={{ width: '100%', height: '100%', objectFit: 'cover', padding: 0}}
              visibleByDefault
              disabledEffect
              src="/images/login-wallpaper.jpg"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              sx={{
                mb: 5,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexGrow: 1, justifyItems: 'space-between' }}
              >
                <Typography variant="h4" gutterBottom>
                  Chào mừng đến
                </Typography>
                <Typography color={'var(--main-color)'} variant="h4">
                  Admin {CONFIG_APP_DETAIL?.name}
                </Typography>
              </Stack>
            </Stack>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
