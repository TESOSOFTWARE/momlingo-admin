import { Box, Container, Typography } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import vn from '../common/locales/vn';
export default function RootPage() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.homeTitle.title}>
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <Box
          sx={{
            backgroundImage: `url('https://img-c.udemycdn.com/course/480x270/3803412_ba41.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 200px)', // Trừ chiều cao của header và footer
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)', // Lớp nền trắng mờ cho nội dung
              borderRadius: 2,
              padding: 4,
              boxShadow: 3,
            }}
          >
            <Typography variant="h3" gutterBottom align="center">
              Welcome to Our Platform
            </Typography>
            <Typography variant="body1" align="center">
              Explore a wide range of courses designed to enhance your skills and
              knowledge. From programming to design, we've got you covered.
            </Typography>
          </Container>
        </Box>
      </Container>
    </Page>
  );
}
