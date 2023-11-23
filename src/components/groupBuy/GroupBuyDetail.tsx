import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import { styleFont } from 'src/styles/styleFont';
import { useLocation, useNavigate } from 'react-router-dom';

const GroupBuyDetail = () => {

    const location = useLocation()
    const id = location.state.id
    console.log(id)
    const navigate = useNavigate()
  return (
    <S.Container>
      <S.ItemImage>
        <li></li>
        <li></li>
        <li></li>
      </S.ItemImage>
      <S.InfoInner>
        <S.UserInfoWrap>
          <S.UserInfoInner>
            <S.UserInfo>
              <p>
                <img></img>
              </p>
              <div>
                <h1>유저이름</h1>
                <h2>신월1동</h2>
              </div>
            </S.UserInfo>
            <S.UserLevel>Lv. 10</S.UserLevel>
          </S.UserInfoInner>
        </S.UserInfoWrap>
        <S.BuyInfoWrap>
          <h1>폴라로이드 카메라 필름 4명 공동구매합니다.</h1>
          <S.SaleInfo>
            <h2>판매종료</h2>
            <p>90,000원</p>
          </S.SaleInfo>
          <S.AddressTime>
            신월1동<span>· 10분전</span>
          </S.AddressTime>
          <h2>
            폴라로이드 카메라 필름 4명 공동구매합니다. 폴라로이드 카메라 필름 4명 공동구매합니다. 폴라로이드 카메라 필름
            4명 공동구매합니다
          </h2>
        </S.BuyInfoWrap>
        <S.PreviewParticipants>
          <p>
            제품 링크:
            <span>
              <a>바로가기</a>
            </span>
          </p>
          <p>
            참여중인 인원
            <Icon name="users" color={COLORS.GRAY[500]} size={20} />
            {/* {currentUserCount}/{maxUser}명 */}
            1/4명
          </p>
        </S.PreviewParticipants>
        <S.BuyMapWrap>
          <h1>장소</h1>
          <div></div>
        </S.BuyMapWrap>
      </S.InfoInner>
      <S.FnWrap>
        <S.HeartIcon>♡</S.HeartIcon>
        <S.ChatButton>채팅하기</S.ChatButton>
        <S.GroupBuyButton 
        onClick={()=>navigate(`/group-buy/${id!}/order`)}
        >공동구매하기</S.GroupBuyButton>
      </S.FnWrap>
    </S.Container>
  );
};

export default GroupBuyDetail;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
    position: relative;
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
  UserInfoInner: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: solid 1px ${COLORS.GRAY[400]};
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      background-color: #5a0000;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      h1 {
        ${styleFont.body1}
        font-weight: 600;
      }
      h2 {
        ${styleFont.body2}
        color: ${COLORS.GRAY[400]};
      }
    }
  `,
  UserLevel: styled.p`
    ${styleFont.body2}
    font-weight: 600;
  `,
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
  BuyMapWrap: styled.div`
    h1 {
      ${styleFont.body2}
      font-weight: 600;
      padding-bottom: 8px;
    }
    div {
      width: 100%;
      height: 210px;
      border-radius: 16px;
      background-color: #00005e;
    }
  `,
  FnWrap: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-top: solid 1px ${COLORS.GRAY[500]};
    position: sticky; left: 0; bottom: 0;
    padding: 10px 10px;
  `,
  HeartIcon:styled.button`
    font-size: 26px;
  `,
  GroupBuyButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0.8rem 3.6rem;
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
  `,
  ChatButton: styled.button`
    border: solid 1px ${COLORS.GREEN[300]};
    padding: 0.8rem 1.2rem;
    color: ${COLORS.GREEN[300]};
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
