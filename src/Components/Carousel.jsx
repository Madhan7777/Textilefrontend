import React from 'react';
import Slider from 'react-slick';
import './Carousel.css'; // Optional: Custom styles for Carousel

// Array of image URLs
const carouselImages = [
  'https://img.freepik.com/premium-photo/wall-clothes-including-one-that-says-other_1086760-148411.jpg',
  'https://example.com/images/slide2.jpg',
  'https://example.com/images/slide3.jpg',
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {carouselImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} className="w-full h-auto" />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
