import styled from 'styled-components';
import Icon from '../icon/Icon';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import userStore from 'src/store/userStore';

const MyPageUserBasicInfo = () => {
  const { profile: user } = userStore();

  return (
    <S.Container>
      <S.ProfileImageBox>
        <S.ProfileChangeBtn>
          <Icon name="camera" size="16px" />
        </S.ProfileChangeBtn>
        <S.ProfileImage src="https://via.placeholder.com/70" />
      </S.ProfileImageBox>
      <S.UserName>{user?.nickname}</S.UserName>
      <S.UserInfo>
        Lv.{user?.level} | {user?.address}
      </S.UserInfo>
    </S.Container>
  );
};

export default MyPageUserBasicInfo;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
  `,
  ProfileImageBox: styled.div`
    position: relative;
  `,
  ProfileImage: styled.img`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    overflow: hidden;
    border: 1px solid ${COLORS.GRAY[400]};
  `,
  ProfileChangeBtn: styled.div`
    padding: 4px;
    border: 1px solid ${COLORS.GREEN[400]};
    background-color: white;

    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UserName: styled.p`
    margin: 8px 0;
    color: ${COLORS.GRAY[900]};
    ${styleFont.h2}
  `,
  UserInfo: styled.p`
    color: ${COLORS.GRAY[400]};
    ${styleFont.body3}
  `
};
