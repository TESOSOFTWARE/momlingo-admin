/* eslint-disable no-prototype-builtins */
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// @types
// import { Product } from '../../../../@types/product';
//
import { useDispatch } from 'src/common/redux/store';
import Image from '../../../common/components/Image';
import { CarouselArrowIndex } from '../../../common/components/carousel';
import getFileData from '../../utils/getFileData';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

type Props = {
  product: any;
  actionText: any;
  dataRouting: any;
  titleList?: string[];
};

export default function ImageSectionCarousel({
  product,
  actionText,
  dataRouting,
  titleList,
}: Props) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState<Slider>();

  const [nav2, setNav2] = useState<Slider>();

  const slider1 = useRef<Slider | null>(null);

  const slider2 = useRef<Slider | null>(null);

  const imagesLightbox = product?.data?.map((_image: any) => _image);

  const handleOpenLightbox = (url: string) => {
    const selectedImage = imagesLightbox.findIndex((index: any) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    speed: 320,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };
  // const route = dataRouting?.find((item: any) => {
  //   if (item?.route === actionText[currentIndex]) {
  //     return item?.name;
  //   }
  // });

  const settings2 = {
    speed: 320,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: product.data.length > 3 ? 3 : product.data.length,
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', mt: '20px' }}>
        <Box
          sx={{
            zIndex: 0,
            overflow: 'hidden',
            width: '850px',
            height: '420px',
            position: 'relative',
            borderRadius: '16px',
          }}
        >
          <Box
            position={'absolute'}
            top={0}
            left={0}
            right={0}
            bottom={'-10px'}
            zIndex={10}
          >
            <Slider {...settings1} asNavFor={nav2} ref={slider2}>
              {product.data.map((img: any, index: number) => {
                const { preview } = getFileData(img, index);
                return (
                  <Box key={img}>
                    <Image
                      alt="large image"
                      height={'434px'}
                      src={preview}
                      borderRadius={'16px'}
                      sx={{
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>

          <Box zIndex={12} position={'absolute'} bottom={'4px'} left={'60%'}>
            <CarouselArrowIndex
              index={currentIndex}
              total={product.data.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </Box>
        </Box>
      </Box>
    </RootStyle>
  );
}
