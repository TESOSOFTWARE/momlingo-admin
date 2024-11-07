import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductCard from './ProductCard';

export default function ProductCarousel1({ item }: { item: any }) {
  const settings = {
    infinite: true,
    slidesToShow: item?.length >= 5 ? 5 : item?.length,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: 'linear',
  };

  return (
    <Slider {...settings}>
      {item?.map((i: any) => (
        <ProductCard
          image={i?.thumbnail?.url}
          price={i?.price}
          title={i?.productDetails?.[0]?.name}
          point={i?.point}
          onSale={i?.onSale}
          key={i?.id}
        />
      ))}
    </Slider>
  );
}
