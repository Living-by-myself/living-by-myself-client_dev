import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCommunityMutate from 'src/api/community/communityMutate';
import { communityWriteImageStore, communityWriteStore } from 'src/store/communityStore';
import styled from 'styled-components';

const token = localStorage.getItem('atk');

const WriteHeader = () => {
  const { title, description, category } = communityWriteStore();
  const { files } = communityWriteImageStore();
  const location = useLocation();
  const { addCommunityPostHandler, updateCommunityPostHandler } = useCommunityMutate();

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
            const formData = new FormData();
            const requestDto = {
              title: title,
              description: description,
              category: category
            };
            formData.append('requestDto', JSON.stringify(requestDto));

            if (files.length === 0) {
            } else {
              for (let i = 0; i < files.length; i++) {
                formData.append('fileName', files![i]);
              }
            }

            if (location.pathname === '/community/write') {
              addCommunityPostHandler(formData);
              navigate('/community');
            } else {
              const id = location.pathname.split('/')[2];
              updateCommunityPostHandler(id, formData);
              navigate(`/community/${id}`);
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
