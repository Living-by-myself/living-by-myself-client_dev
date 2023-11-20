import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { token } from 'src/api/testAuth';
import { CommunityWriteImageStore, CommunityWriteStore } from 'src/store/communityStore';
import styled from 'styled-components';

const WriteHeader = () => {
  const { title, description, category } = CommunityWriteStore();
  const { files } = CommunityWriteImageStore();
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </S.BackButton>
      <S.LogoBox>작성하기</S.LogoBox>
      <S.ButtonBox>
        <button
          onClick={async () => {
            console.log(title, description, category, files);

            const formData = new FormData();
            const requestDto = {
              title: title,
              description: description,
              category: category
            };
            formData.append('requestDto', JSON.stringify(requestDto));
            for (let i = 0; i < files.length; i++) {
              formData.append('fileName', files[i]);
            }
            try {
              const response = await axios.post('https://tracelover.shop/home/communities', formData, {
                headers: {
                  Authorization: token
                }
              });
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }}

          // 서버에 보내는 코드
        >
          작성버튼!
        </button>
      </S.ButtonBox>
    </S.Container>
  );
};

export default WriteHeader;

const S = {
  Container: styled.div`
    width: 100%;
    height: 50px;
    background-color: royalblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `,
  LogoBox: styled.div``,
  BackButton: styled.div``,
  ButtonBox: styled.div``
};
