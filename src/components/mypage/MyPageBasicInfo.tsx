import styled from 'styled-components';
import Icon from '../icon/Icon';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import userStore, { UserProfile } from 'src/store/userStore';
import { updateUserProfileImage } from 'src/api/user/user';
import { useRef } from 'react';

const MyPageUserBasicInfo = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { profile: user, setProfile, isLogged } = userStore();
  console.log(user)

  if (isLogged === false) return <>로딩중</>;

  const onInputProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const newProfile = { ...user, profileImage: result };
        setProfile(newProfile as UserProfile);

        const formData = new FormData();
        formData.append('fileName', file);
        updateUserProfileImage(formData);
      };
    }
  };

  return (
    <S.Container>
      <S.ProfileImageBox>
        <S.ProfileChangeBtn
          onClick={() => {
            ref.current?.click();
          }}
        >
          <input ref={ref} type="file" accept="image/*" onChange={onInputProfileImage} hidden />
          <Icon name="camera" size="16px" />
        </S.ProfileChangeBtn>
        <S.ProfileImage
          src={user?.profileImage === null ? 'https://via.placeholder.com/70' : (user!.profileImage as string)}
        />
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
