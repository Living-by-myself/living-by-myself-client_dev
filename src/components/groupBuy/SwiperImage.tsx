import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';

const SwiperImage = () => {
  return (
    <S.SwiperWrap>
      <S.CustomSwiper
        pagination={{
          type: 'fraction'
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <S.SwiperSlide><img></img></S.SwiperSlide>
        <S.SwiperSlide><img></img></S.SwiperSlide>
        {/* <SwiperSlide>slide 3</SwiperSlide>
          <SwiperSlide>slide 4</SwiperSlide> */}
      </S.CustomSwiper>
    </S.SwiperWrap>
  );
};

export default SwiperImage;

const S = {
  SwiperWrap: styled.div`
    width: 100%;
    height: 360px;
  `,
  CustomSwiper: styled(Swiper)`
    width: 100%;
    height: 100%;
  `,
  SwiperSlide: styled(SwiperSlide)`
  width: 100%;
  height: 100%;
    text-align: center;
    font-size: 18px;
    background: #fff;
    img{
        display: block;
        width:100%;
        height: 100%;
        object-fit: cover;
        background-color: red;
    }
  `
};
