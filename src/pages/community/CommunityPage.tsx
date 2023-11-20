import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FlexBox, MobileContainer } from 'src/styles/styleBox';
import RoundButton from 'src/components/button/RoundButton';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import CommunityPostCard from 'src/components/community/CommunityPostCard';
import { Post } from 'src/types/community/types';

const CommunityPage = () => {
  const [post, setPost] = useState<Post[]>([]);

  const apiTest = async () => {
    try {
      const response = await axios.get('https://tracelover.shop/home/communities', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiTest();
  }, []);

  return (
    <MobileContainer>
      <S.FilterArea>
        <RoundButton onClick={() => {}} isCheck={true} children={'카테고리'} />
        <RoundButton onClick={() => {}} isCheck={false} children={'필터'} />
      </S.FilterArea>
      <S.CommunityList>
        {post?.map((item) => {
          return <CommunityPostCard post={item} />;
        })}
      </S.CommunityList>
    </MobileContainer>
  );
};

export default CommunityPage;

export const S = {
  FilterArea: styled(FlexBox)`
    width: 100%;
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
  `,
  CommunityList: styled.div`
    width: 100%;
    padding: 0 16px;
  `
};
