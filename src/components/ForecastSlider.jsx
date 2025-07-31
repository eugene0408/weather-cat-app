import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { ForecastCard } from "./ForecastCard";

const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-y: visible;

  .slick-slide > div {
    margin: 10px 0;
  }

  .slick-list {
    margin: 0 -10;
  }

  .slick-dots li button:before {
    color: #999;
  }

  .slick-dots li.slick-active button:before {
    color: #000;
  }
`;

export const ForecastSlider = ({ forecast }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {forecast.map((item, index) => (
          <div key={`f${index}`}>
            <ForecastCard forecastItem={item} />
          </div>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};
