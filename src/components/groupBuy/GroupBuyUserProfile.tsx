import React from 'react'
import { COLORS } from 'src/styles/styleConstants'
import { styleFont } from 'src/styles/styleFont'
import { GroupBuyUserType, JoinUserType } from 'src/types/groupBuy/types'
import styled from 'styled-components'

const GroupBuyUserProfile = ({nickname,profileImage}:JoinUserType) => {
    return (
        <S.UserInfoInner>
            <S.UserInfo>
                <p>
                    {profileImage === null ? <img src='/imgs/basicUserImage.png'></img> : <img src={profileImage}></img>}
                </p>
                <div>
                    <h1>{nickname}</h1>
                    {/* <h2>{writer?.address}</h2> */}
                </div>
            </S.UserInfo>
            {/* <S.UserLevel>Lv. {writer?.level}</S.UserLevel> */}
        </S.UserInfoInner>
    )
}

export default GroupBuyUserProfile

const S = {
    UserInfoInner: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: solid 1px ${COLORS.GRAY[400]};
  `,
  UserLevel: styled.p`
    ${styleFont.body2}
    font-weight: 600;
  `,
    UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    p {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      img {
        width: 100%;
        height: 100%;
      }
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
}