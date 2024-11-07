import { Stack } from '@mui/system';
import ProductCarousel2 from './ProductCarousel2';
import ProductHeader from './ProductHeader';
import { Box } from '@mui/material';
import { IDataRequest } from '../../interface';

export default function Product2({ id, item }: { id: string; item: IDataRequest }) {
  console.log('item: ', item);
  return (
    <Box
      sx={{
        marginTop: '10px',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2}>
        <ProductHeader title={item?.title} id={id} />
        <ProductCarousel2 item={item?.data?.products} />
      </Stack>
    </Box>
  );
}
