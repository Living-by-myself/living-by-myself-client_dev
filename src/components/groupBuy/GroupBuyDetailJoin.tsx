import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import { styleFont } from 'src/styles/styleFont';

const GroupBuyDetailJoin = () => {
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
          <ul>
            <li>
              <h1>
                <img></img>
              </h1>
              <h2>토마스</h2>
            </li>
            <li>
              <h1>
                <img></img>
              </h1>
              <h2>토마스</h2>
            </li>
            <li>
              <h1>
                <img></img>
              </h1>
              <h2>토마스</h2>
            </li>
            <li>
              <h1>
                <img></img>
              </h1>
              <h2>토마스</h2>
            </li>
          </ul>
        </S.PreviewParticipants>
        <S.BuyMapWrap>
          <h1>장소</h1>
          <div></div>
        </S.BuyMapWrap>
      </S.InfoInner>
    </S.Container>
  );
};

export default GroupBuyDetailJoin;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
  `,
  ItemImage: styled.ul`
    width: 100%;
    height: 360px;
    background-color: #004100;
  `,
  InfoInner: styled.div`
    padding: 0px 10px;
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
      gap: 5px;
    }
  `,
  UserLevel: styled.p``,
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
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        gap: 8px;
        h1 {
          width: 70px;
          height: 70px;
          border-radius: 100%;
          background-color: gray;
        }
        h2 {
          ${styleFont.body2}
          font-weight: 600;
        }
      }
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
  `
};
