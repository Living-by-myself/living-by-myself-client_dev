import styled from 'styled-components';
import { useRef, useState } from 'react';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from 'src/api/community';
import { useParams } from 'react-router-dom';
import useCommentMutate from 'src/api/communityMutate';
import { set } from 'react-hook-form';

const CommentInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');
  const param = useParams() as { id: string };
  const { WriteComment } = useCommentMutate(param.id);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };

  const onSubmit = () => {
    WriteComment(param.id, text);
  };

  return (
    <S.Container
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        setText('');
      }}
    >
      <S.InputArea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        placeholder="내용을 입력하세요."
        rows={1}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
      >
        {/* <S.CommentInput placeholder="댓글을 입력해주세요." /> */}
      </S.InputArea>
      <S.CommentBtn>등록</S.CommentBtn>
    </S.Container>
  );
};

export default CommentInput;

const S = {
  Container: styled.form`
    display: flex;
    gap: 8px;
  `,
  InputArea: styled.textarea`
    background-color: ${COLORS.GRAY[200]};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 13px 20px;

    resize: none;
    width: 100%;
    line-height: 1.5;

    border-radius: 10px;
    border: none;
    outline: none;

    ${styleFont.body3}
  `,
  CommentBtn: styled.button`
    width: 40px;
    /* height: 40px; */
    min-width: 40px;
    min-height: 40px;
    border-radius: 50px;
    border: none;
    background-color: ${COLORS.GRAY[200]};
  `
};
