import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import { styleFont } from 'src/styles/styleFont';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SwiperImage from './SwiperImage';
import { useQuery } from '@tanstack/react-query';
import { getGroupBuyDetailData } from 'src/api/groupBuy/groupBuy';
import { getRelativeTimeString } from 'src/utilities/getDate';
import { JoinUserType } from 'src/types/groupBuy/types';
import { joinUser } from 'src/utilities/GroupBuy';
import GroupBuyBookmark from './GroupBuyBookmark';
import GroupBuyChat from './GroupBuyChat';
import GroupBuyClose from './GroupBuyClose';
import GroupBuyUserProfile from './GroupBuyUserProfile';
import GroupBuyCancel from './GroupBuyCancel';
import GroupBuyJoinUsers from './GroupBuyJoinUsers';

const GroupBuyDetail = () => {
  const paramsId = useParams() as unknown as { id: number };
  const id = Number(paramsId.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupBuy', id],
    queryFn: () => getGroupBuyDetailData(id)
  });

  const writer = data?.users[joinUser(data!.users!.length as number)] as JoinUserType;

  const findWriter = writer?.id.toString() === localStorage.getItem('id');

  const joinUsers = data?.users.find((user: JoinUserType) => {
    return user.id.toString() === localStorage.getItem('id');
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <S.Container>
        <SwiperImage slide={data?.fileUrls} />
        <S.InfoInner>
          <S.UserInfoWrap>
            <GroupBuyUserProfile id={writer!.id} nickname={writer!.nickname} profileImage={writer!.profileImage} />
          </S.UserInfoWrap>
          <S.BuyInfoWrap>
            <h1>{data?.title}</h1>
            <S.SaleInfo>
              <h2>{data?.enumShare ? '판매중' : '판매종료'}</h2>
              <p>{(data?.perUserPrice / data?.maxUser).toLocaleString()}원</p>
            </S.SaleInfo>
            <S.AddressTime>
              {data?.address}
              <span>· {getRelativeTimeString(data?.createdAt)}</span>
            </S.AddressTime>
            <h2>{data?.description}</h2>
          </S.BuyInfoWrap>
          <S.PreviewParticipants>
            <p>
              제품 링크:
              <span>
                <a target="_blank" href={data?.itemLink} rel="noreferrer">
                  바로가기
                </a>
              </span>
            </p>
            <p>
              참여중인 인원
              <Icon name="users" color={COLORS.GRAY[500]} size={20} />
              {data?.currentUserCount}/{data?.maxUser}명
            </p>
            <S.JoinUserWrap>
              {data?.users?.slice(0, -1).map((joinUser: JoinUserType) => {
                return (
                  <GroupBuyJoinUsers
                    id={joinUser.id}
                    profileImage={joinUser.profileImage}
                    nickname={joinUser.nickname}
                  />
                );
              })}
            </S.JoinUserWrap>
          </S.PreviewParticipants>
          <S.BuyMapWrap>
            <h1>장소</h1>
            <div>
              <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '200px' }} level={3}>
                <MapMarker position={{ lat: 33.5563, lng: 126.79581 }} />
              </Map>
            </div>
          </S.BuyMapWrap>
        </S.InfoInner>
        <S.FnWrap>
          <GroupBuyBookmark likeCount={data?.likeCount!} id={id} pickLike={data?.pickLike!} />
          <GroupBuyChat id={writer.id} />
          {/* {findWriter && data?.currentUserCount === data?.maxUser ? (
            <GroupBuyClose id={id} users={data.users} writerId={writer.id} writerNickname={writer.nickname} />
          ) : findWriter && data?.currentUserCount === 1 ? (
            <S.GroupBuyButton>글내리기</S.GroupBuyButton>
          ) : !findWriter && !joinUsers ? (
            <S.GroupBuyButton>
              <Link to={`/group-buy/${id}/order`}>공동구매하기</Link>
            </S.GroupBuyButton>
          ) : !findWriter && joinUsers ? (
            <GroupBuyCancel id={id} />
          ) : null} */}
          {findWriter && data?.currentUserCount === data?.maxUser && (
            <GroupBuyClose id={id} users={data.users} writerId={writer.id} writerNickname={writer.nickname} />
          )}
          {findWriter && data?.currentUserCount === 1 && <S.GroupBuyButton>글내리기</S.GroupBuyButton>}
          {!findWriter && !joinUsers && (
            <S.GroupBuyButton>
              <Link to={`/group-buy/${id}/order`}>공동구매하기</Link>
            </S.GroupBuyButton>
          )}
          {!findWriter && joinUsers && <GroupBuyCancel id={id} />}
        </S.FnWrap>
      </S.Container>
    </>
  );
};

export default GroupBuyDetail;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
    overflow: scroll;
    height: 100vh;
    position: relative;
  `,
  CustomSwiper: styled(Swiper)`
    width: 100%;
    height: 360px;
  `,
  SwiperSlide: styled(SwiperSlide)`
    width: 100%;
    height: 360px;
  `,
  ItemImage: styled.ul`
    width: 100%;
    height: 360px;
    background-color: #004100;
  `,
  InfoInner: styled.div`
    padding: 0px 10px 100px 10px;
  `,
  UserInfoWrap: styled.div``,

  BuyInfoWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    h1 {
      ${styleFont.body1}
      font-weight: bold;
      margin-top: 15px;
    }
    h2 {
      ${styleFont.body2}
      font-weight: 600;
      letter-spacing: -0.5px;
    }
  `,
  AddressTime: styled.p`
    color: ${COLORS.GRAY[400]};
    ${styleFont.body2}
    margin: -8px 0px 0px 0px;
  `,
  SaleInfo: styled.div`
    display: flex;
    gap: 5px;
    h2 {
      ${styleFont.body1}
      color: ${COLORS.GRAY[400]};
      font-weight: 600;
    }
    p {
      ${styleFont.body1}
      color: ${COLORS.GREEN[300]};
      font-weight: 600;
    }
  `,
  PreviewParticipants: styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    padding: 38px 0px;
    ${styleFont.body2}
    gap: 6px;
    p {
      ${styleFont.body2}
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  JoinUserWrap: styled.div`
    display: flex;
    margin-top: 20px;
    gap: calc(20% / 3);
    width: 100%;
  `,
  BuyMapWrap: styled.div`
    width: 100%;
    h1 {
      ${styleFont.body2}
      font-weight: 600;
      padding-bottom: 8px;
    }
    div {
      border-radius: 16px;
    }
  `,
  FnWrap: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-top: solid 1px ${COLORS.GRAY[500]};
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 99;
    padding: 10px 10px;
  `,
  GroupBuyButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: 205px;
    padding: 0.8rem 0px;
    background-color: ${COLORS.GREEN[300]};
    color: ${COLORS.GRAY[0]};
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  `
};
