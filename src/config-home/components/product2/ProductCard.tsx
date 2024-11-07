import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import Iconify from '../../../common/components/Iconify';
import Image from '../../../common/components/Image';

type ProductCardProps = {
  image?: string;
  price: {
    salePrice?: number;
    normalPrice?: number;
  };
  point: {
    salePoint?: number;
    normalPoint?: number;
  };
  title?: string;
  onSale: boolean;
};
export default function ProductCard({
  image,
  price,
  point,
  title,
  onSale,
}: ProductCardProps) {
  return (
    <>
      <Card
        sx={{
          width: '160px',
          height: '260px',
          display: 'flex',
          flexDirection: 'column',
          margin: '5px',
        }}
      >
        <Box
          component="img"
          sx={{
            height: '70%',
            width: '100%',
            objectFit: 'cover',
            flexGrow: 1,
          }}
          alt={'images'}
          src={image}
        />
        {/* <Divider sx={{ bgcolor: '#E82629' }} /> */}

        <Box sx={{ bgcolor: '#FFFFFF', width: '100%' }}>
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '8px',
              color: '#17181A',
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingLeft: '8px',
              paddingRight: '8px',
              color: '#98A1B3',
              fontSize: '12px',
              display: 'flex',
            }}
          >
            Giá trị:
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: '2px',
                paddingRight: '3px',
                color: '#98A1B3',
                fontSize: '12px',
                textDecoration: onSale ? 'line-through' : 'none',
              }}
            >
              {price.normalPrice}đ
            </Typography>
            {onSale && (
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  color: '#98A1B3',
                  fontSize: '12px',
                }}
              >
                {price.salePrice}đ
              </Typography>
            )}
          </Typography>

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            paddingLeft={'8px'}
            paddingRight={'8px'}
          >
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // paddingLeft: '8px',
                paddingRight: '8px',
                paddingBottom: '4px',
                paddingTop: '8px',
                color: '#E82629',
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <Iconify icon="teenyicons:star-circle-solid" />
              <Typography
                fontSize={'14px'}
                paddingLeft={'4px'}
                sx={{ textDecoration: onSale ? 'line-through' : 'none' }}
              >
                {point.normalPoint} xu
              </Typography>
              {onSale && (
                <Typography fontSize={'14px'} paddingLeft={'4px'}>
                  {point.salePoint} xu
                </Typography>
              )}
            </Typography>
            <Box width={'28px'} height={'28px'}>
              <img
                src="/images/ShoppingBag.png"
                alt="shopping bag"
                style={{
                  width: '28px',
                  height: '28px',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
