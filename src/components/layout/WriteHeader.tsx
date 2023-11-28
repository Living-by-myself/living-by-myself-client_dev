import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCommunityMutate from 'src/api/community/communityMutate';
import { communityWriteImageStore, communityWriteStore } from 'src/store/communityStore';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import { styleFont } from 'src/styles/styleFont';

const token = localStorage.getItem('atk');

const WriteHeader = () => {
  const { title, description, category } = communityWriteStore();
  const { files } = communityWriteImageStore();
  const location = useLocation();
  const { addCommunityPostHandler, updateCommunityPostHandler } = useCommunityMutate();
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Header>
        <S.BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <Icon name="undo-2" size={24} />
        </S.BackButton>
        <S.LogoBox>{location.pathname === '/community/write' ? '글쓰기' : '게시글 수정'}</S.LogoBox>
        <S.ButtonBox>
          <div
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
            <Icon name="pencil" size={24} />
          </div>
        </S.ButtonBox>
      </S.Header>
    </S.Container>
  );
};

export default WriteHeader;

const S = {
  Container: styled.div`
    display: flex;
    width: 100vw;

    align-items: center;
    height: 50px;
    color: ${COLORS.GRAY[0]};
    border-bottom: 1px solid ${COLORS.GRAY[200]};
    background-color: ${COLORS.GREEN[400]};
  `,
  Header: styled.header`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    position: relative;
  `,
  LogoBox: styled.div`
    ${styleFont.h3}
  `,
  BackButton: styled.div``,
  ButtonBox: styled.div``
};
