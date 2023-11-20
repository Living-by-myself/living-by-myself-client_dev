import React, { useRef } from 'react';
import styled from 'styled-components';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CommunityWriteFormData } from './CommunityWriteCategoty';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';

interface CommunityWriteTextProps {
  watch: UseFormWatch<CommunityWriteFormData>;
  setValue: UseFormSetValue<CommunityWriteFormData>;
  // errors: FieldErrors<CommunityWriteFormData>;
}

const CommunityWriteText = () => {
  // const textareaRef1 = useRef<HTMLTextAreaElement | null>(null);

  // const titleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   // 첫 번째 textarea 높이 조절

  //   if (e.currentTarget.value.length > 20) {
  //     alert('제목은 20자 이내로 입력해주세요.');
  //     return;
  //   }
  //   setValue('title', e.currentTarget.value);
  //   if (textareaRef1 && textareaRef1.current) {
  //     textareaRef1.current.style.height = 'auto';
  //     const scrollHeight = textareaRef1.current.scrollHeight;
  //     textareaRef1.current.style.height = scrollHeight + 'px';
  //   }
  // };

  // const textareaRef2 = useRef<HTMLTextAreaElement | null>(null);

  // const bodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setValue('description', e.currentTarget.value);
  //   console.log(watch('description'));
  //   // 두 번째 textarea 높이 조절
  //   if (textareaRef2 && textareaRef2.current) {
  //     textareaRef2.current.style.height = 'auto';
  //     const scrollHeight = textareaRef2.current.scrollHeight;
  //     textareaRef2.current.style.height = scrollHeight + 'px';
  //   }
  // };

  return (
    <S.Container>
      <S.Title type="text" maxLength={20} placeholder="20자 이내 제목" />

      <S.Body placeholder="20자 이상 내용" />
    </S.Container>
  );
};

export default CommunityWriteText;

const S = {
  ErrorMessage: styled.p``,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* padding: 12px 0; */

    gap: 8px;
    line-height: normal;
  `,
  Title: styled.input`
    ${styleFont.h2}
    color: ${COLORS.GRAY[900]};

    background-color: transparent;
    border: none;
    outline: none;
  `,
  Body: styled.textarea`
    ${styleFont.body1}
    color: ${COLORS.GRAY[900]};
    height: 70vh;
    padding: 0;
    background-color: transparent;
    border: none;
    line-height: 1.5;
    outline: none;
  `
};
