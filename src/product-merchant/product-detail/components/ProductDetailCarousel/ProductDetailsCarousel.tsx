import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { Box, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// @types
//
import Image from '../../../../common/components/Image';

import CarouselArrowIndex from './CarouselArrowIndex';
import LightboxModal from './LightboxModal';

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
  showImages: string[];
};

export default function ProductDetailsCarousel({ showImages }: Props) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState<Slider>();

  const [nav2, setNav2] = useState<Slider>();

  const slider1 = useRef<Slider | null>(null);

  const slider2 = useRef<Slider | null>(null);

  const imagesLightbox = showImages;

  const handleOpenLightbox = (url: string) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    speed: 320,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const settings2 = {
    speed: 320,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: showImages.length > 3 ? 3 : showImages.length,
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
      <Box sx={{ p: 1 }}>
        <Box
          sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}
        >
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {showImages.map((img) => (
              <Image
                key={img}
                alt="large image"
                src={img}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))}
          </Slider>
          <CarouselArrowIndex
            index={currentIndex}
            total={showImages.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(showImages.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(showImages.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(showImages.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(showImages.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(showImages.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(showImages.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(
                  theme.palette.background.paper,
                  0
                )} 0%, ${theme.palette.background.paper} 100%)`,
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' },
          }),
        }}
      >
        <Stack sx={{ width: 240, overflow: 'hidden' }}>
          <Slider {...settings2} asNavFor={nav1} ref={slider2}>
            {showImages.map((img, index) => (
              <Box
                key={img}
                sx={{
                  px: 0.75,
                  maxWidth: '300px',
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${img})`,
                    width: THUMB_SIZE,
                    height: THUMB_SIZE,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    ...(currentIndex === index && {
                      border: (theme) => `solid 3px ${theme.palette.primary.main}`,
                    }),
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Stack>
      </Box>

      <LightboxModal
        animationDuration={320}
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
        onMovePrevRequest={() => {
          handlePrevious();
          setSelectedImage(
            (selectedImage + imagesLightbox.length - 1) % imagesLightbox.length
          );
        }}
        onMoveNextRequest={() => {
          handleNext();
          setSelectedImage((selectedImage + 1) % imagesLightbox.length);
        }}
      />
    </RootStyle>
  );
}