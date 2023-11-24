import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { extractImageUrls } from 'src/utilities/image';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideImgProps {
  fileUrls: string;
}

const SwiperImage = (silde: any) => {

  const imageData = () => {
    if (silde.slide) {
      return extractImageUrls(silde.slide);
    }
  };

  return (
    <S.SwiperWrap>
      <S.CustomSwiper
        spaceBetween={30} // 슬라이드 간 간격
        slidesPerView={1} // 보여질 슬라이드 수
        navigation // 네비게이션 활성화
        pagination={{ clickable: true }} // 페이지네이션 활성화
        modules={[Pagination, Navigation]}
      >
        {imageData()?.map((img,index) => {
          return (
              <S.SwiperSlide key={index}>
                <img src={img} alt="Image" />
              </S.SwiperSlide>
          );
        })}
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
    background-image: cover;
    img{
      
      width: 100%;
      height:100%;
      object-fit: cover;
        

    }
  `
};
