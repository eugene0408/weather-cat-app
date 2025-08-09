import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import LeftArrow from "../assets/left-arrow.svg?react";
import RightArrow from "../assets/right-arrow.svg?react";

const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-y: visible;

  .slick-slide > div {
    margin: 2px 0;
  }

  .slick-list {
    margin: 0 -10;
  }

  .slick-dots li {
    margin: 0;
  }

  .slick-dots li button:before {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.2;
    transition: all 0.3s ease;
  }

  .slick-dots li.slick-active button:before {
    color: ${(props) => props.theme.colors.accent};
    opacity: 1;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  background: transparent;
  /* remove default slick arrows */
  &::before {
    content: "";
    width: 0;
  }
  svg {
    height: 100%;
    width: 100%;
  }
  svg path {
    fill: ${(props) => props.theme.colors.text};
  }
  /* style disabled button */
  &.slick-disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const PrevArrow = (props) => {
  const { onClick, className } = props;
  return (
    <ArrowButton
      style={{ left: "-25px" }}
      className={className}
      onClick={onClick}
    >
      <LeftArrow />
    </ArrowButton>
  );
};
const NextArrow = (props) => {
  const { onClick, className } = props;
  return (
    <ArrowButton
      style={{ right: "-25px" }}
      className={className}
      onClick={onClick}
    >
      <RightArrow />
    </ArrowButton>
  );
};

export const ForecastSlider = ({ children }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>{children}</Slider>
    </CarouselWrapper>
  );
};
