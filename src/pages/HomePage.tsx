import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMainPageData } from 'src/api/home/mainPage';
import { getKakaoLoginToken } from 'src/api/user/user';
import CommunityPostCard from 'src/components/community/CommunityPostCard';
import GroupBuyPostCard from 'src/components/groupBuy/GroupBuyPostCard';
import Icon from 'src/components/icon/Icon';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { Post } from 'src/types/community/types';
import { GroupBuyPreviewType } from 'src/types/groupBuy/types';
import styled from 'styled-components';

export interface HomePageData {
  community: Post[];
  groupBuy: GroupBuyPreviewType[];
}

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<HomePageData>(['mainPage'], getMainPageData);

  isLoading && <div>로딩중</div>;
  isError && <div>에러</div>;

  return (
    <MobileContainer className="mobileContainer">
      <S.Container>
        <S.Banner>
          <S.BannerImg src="https://i.ibb.co/Zfrz9Wd/Frame-61.jpg" alt="배너이미지" />
        </S.Banner>
        <S.ContentsBox>
          <S.TabArea>
            <S.MoreTab
              onClick={() => {
                navigate('/community');
              }}
            >
              <S.TitleArea>
                <S.Title>혼자 살 때</S.Title>
                <S.Category>커뮤니티</S.Category>
              </S.TitleArea>
              <S.ButtonMore>
                더보기 <Icon name="chevron-right" size={16} />
              </S.ButtonMore>
            </S.MoreTab>

            {data?.community.map((post) => {
              return (
                <div key={post.id}>
                  <Link to={`/community/${post.id}`}>
                    <CommunityPostCard post={post} />
                  </Link>
                </div>
              );
            })}
          </S.TabArea>

          <S.TabArea>
            <S.MoreTab
              onClick={() => {
                navigate('/group-buy');
              }}
            >
              <S.TitleArea>
                <S.Title>같이 살 때</S.Title>
                <S.Category>공동구매</S.Category>
              </S.TitleArea>
              <S.ButtonMore>
                더보기 <Icon name="chevron-right" size={16} />
              </S.ButtonMore>
            </S.MoreTab>

            <ul>
              {data?.groupBuy.map((data) => {
                return (
                  <li key={data.id} style={{ borderBottom: '1px solid #eee' }}>
                    <Link to={`/group-buy/${data.id}`} state={{ id: data.id }}>
                      <GroupBuyPostCard data={data} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </S.TabArea>
        </S.ContentsBox>
      </S.Container>
    </MobileContainer>
  );
};

export default HomePage;

const S = {
  Container: styled.div`
    width: 100%;
  `,
  Banner: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  BannerImg: styled.img`
    contain: cover;
    height: 240px;
  `,
  ContentsBox: styled.div`
    width: 100%;
    margin-top: 20px;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    /* max-width: 375px; */
  `,
  TitleArea: styled.div`
    display: flex;
    gap: 6px;
    align-items: flex-end;
  `,
  Title: styled.div`
    ${styleFont.h3}
    color: ${COLORS.GRAY[800]};
  `,
  Category: styled.div``,
  TabArea: styled.div`
    ${styleFont.body3}
    color: ${COLORS.GRAY[400]};
    padding: 10px 0;
  `,
  MoreTab: styled.div`
    display: flex;
    border-top: 1px solid ${COLORS.GRAY[300]};
    border-bottom: 1px solid ${COLORS.GRAY[300]};
    padding: 10px 16px;
    align-items: center;
    justify-content: space-between;
  `,
  ButtonMore: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `
};
