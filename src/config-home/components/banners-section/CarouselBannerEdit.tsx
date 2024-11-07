/* eslint-disable no-prototype-builtins */
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// @types
// import { Product } from '../../../../@types/product';
//
import Image from '../../../common/components/Image';
import getFileData from '../../utils/getFileData';
import './style.css';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

type Props = {
  product: any;
  setCurrentIndex: Function;
};

export default function ImageSectionCarouselEdit({ product, setCurrentIndex }: Props) {
  const [nav2, setNav2] = useState<Slider>();

  const slider2 = useRef<Slider | null>(null);

  useEffect(() => {
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handleNext = (index: number) => {
    slider2.current?.slickGoTo(index);
  };

  const settings = {
    dots: false,
    arrows: false,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    vertical: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };
  return (
    <RootStyle>
      <Box sx={{ p: 1, display: 'flex', mt: '20px', overflow: 'hidden' }}>
        <Box
          sx={{
            zIndex: 1,
            width: '850px',
            height: '420px',
            // position: 'relative',
            borderRadius: '16px',
            // overflow: 'hidden',
          }}
        >
          <Box width={'850px'} height={'420px'}>
            <Slider {...settings} ref={slider2}>
              {product.data.map((img: any, index: number) => {
                const { preview } = getFileData(img, index);
                return (
                  <Box key={img} width={'850px'} height={'420px'}>
                    <Image
                      alt="large image"
                      height={'420px'}
                      width={'850px'}
                      src={preview}
                      borderRadius={'16px'}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
        <Box height={'420px'} width={'200px'} overflow={'scroll'} marginLeft={'10px'}>
          {product.data.map((img: any, index: number) => {
            const { preview } = getFileData(img, index);
            return (
              <Box
                key={img}
                padding={'4px'}
                onClick={() => {
                  handleNext(index);
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Image
                  alt="large image"
                  height={'120px'}
                  width={'177px'}
                  src={preview}
                  borderRadius={'8px'}
                  sx={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </RootStyle>
  );
}
