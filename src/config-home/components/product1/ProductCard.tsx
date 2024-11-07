import { Box, Card, Typography } from '@mui/material';
import Iconify from '../../../common/components/Iconify';

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
        sx={{ width: '160px', height: '260px', display: 'flex', flexDirection: 'column' }}
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

        <Box
          sx={{
            bgcolor: '#E82629',
            width: '100%',
            position: 'relative',
            '&::after': {
              background:
                'linear-gradient(to right, #E82629 5%,white 5%, white 15%, #E82629 15%,#E82629 20%, white 20%, white 30%, #E82629 30%,#E82629 35%, white 35%, white 45%,  #E82629 45%,#E82629 50%,white 50%, white 60%, #E82629 60%,#E82629 65%, white 65%, white 75%, #E82629 75%,#E82629 80%,white 80%, white 90%, #E82629 90%,#E82629 95%, white 95%, white 100%)',
              position: 'absolute',
              content: '""',
              height: '2px',
              right: '5px',
              left: '5px',
              top: '-2px',
            },
          }}
        >
          {/* <Box
            sx={{
              bgcolor: 'white',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              borderTopStyle: 'solid',
              borderTopWidth: '2px',
              // borderTopColor: '#E82629',
              borderTopColor:
                'linear-gradient(to right, #bcbcbc 25%,#ffcd02 25%, #ffcd02 50%, #e84f47 50%, #e84f47 75%, #65c1ac 75%)',
            }}
          /> */}
          <Box
            width={'10px'}
            height={'10px'}
            bgcolor={'white'}
            borderRadius={'50%'}
            position={'absolute'}
            top={'-5px'}
            left={'-5px'}
          />
          <Box
            width={'10px'}
            height={'10px'}
            bgcolor={'white'}
            borderRadius={'50%'}
            position={'absolute'}
            top={'-5px'}
            right={'-5px'}
          />
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '8px',
              color: 'white',
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
              color: 'white',
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
                paddingLeft: '8px',
                color: 'white',
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
                  color: 'white',
                  fontSize: '12px',
                }}
              >
                {price.salePrice}đ
              </Typography>
            )}
          </Typography>

          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingLeft: '8px',
              paddingRight: '8px',
              // padding: '8px',
              paddingBottom: '4px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              fontSize: '13px',
            }}
          >
            <Iconify icon="teenyicons:star-circle-solid" />
            <Typography
              fontSize={'14px'}
              paddingLeft={'4px'}
              sx={{
                textDecoration: onSale ? 'line-through' : 'none',
              }}
            >
              {point.normalPoint} xu
            </Typography>
            {onSale && (
              <Typography fontSize={'14px'} paddingLeft={'4px'}>
                {' '}
                {point.salePoint} xu
              </Typography>
            )}
          </Typography>
        </Box>
      </Card>
    </>
  );
}
