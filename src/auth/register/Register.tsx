import { Card, Container, Link, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'src/common/components/Image';
import Page from 'src/common/components/Page';
import useResponsive from 'src/common/hooks/useResponsive';
import LogoOnlyLayout from 'src/common/layouts/LogoOnlyLayout';
import RegisterForm from './components/RegisterForm';
import { LINK_SWITCH } from './register.constants';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

export default function Register() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title="Register New Merchat">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Register New Merchant
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/illustrations/illustration_register.png"
              alt="register"
            />
          </SectionStyle>
        )}
        <LogoOnlyLayout />
        <Container
          maxWidth="sm"
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography sx={{ position: 'absolute', top: '20px', right: '50px' }}>
            Already have an account?{' '}
            <Link href={LINK_SWITCH.login_link} underline="hover">
              Login
            </Link>
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography mb={3} variant="h4">
              Register For New Merchant
            </Typography>
            <RegisterForm />
            <Typography mt={3} sx={{ color: '#637381', fontSize: '13px' }}>
              By signing up, I agree to Loyalty{' '}
              <Link href="#" underline="hover">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" underline="hover">
                Privacy Policy.
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
