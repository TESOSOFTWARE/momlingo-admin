import { Stack } from '@mui/system';
import ProductCarousel1 from './ProductCarousel1';
import ProductHeader from './ProductHeader';
import { Box } from '@mui/material';
import { IDataRequest } from '../../interface';

export default function Product1({ id, item }: { id: string; item: IDataRequest }) {
  return (
    <Box
      sx={{
        marginTop: '10px',
        padding: '20px',
      }}
    >
      <Stack spacing={2}>
        <ProductHeader title={item?.title} id={id} />
        <ProductCarousel1 item={item?.data?.products} />
      </Stack>
    </Box>
  );
}
