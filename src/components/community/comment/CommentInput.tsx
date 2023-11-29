import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useCommentMutate from 'src/api/comment/commentMutate';
import { set } from 'react-hook-form';
import Icon from 'src/components/icon/Icon';

interface CommentInputProps {
  commentId?: string;
  description?: string;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ commentId, description, setIsEdit }: CommentInputProps) => {
  const [text, setText] = useState('');
  const param = useParams() as { id: string };
  const { WriteComment, updateCommentHandler } = useCommentMutate(param.id);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onSubmit = () => {
    if (commentId && description && setIsEdit) {
      updateCommentHandler(commentId, text);
      setIsEdit(false);
    } else {
      WriteComment(param.id, text);
    }
  };

  useEffect(() => {
    if (commentId && description) {
      setText(description);
    }
  }, []);

  return (
    <S.Container
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        setText('');
      }}
    >
      <S.InputArea value={text} onChange={onChange} placeholder="내용을 입력하세요." />
      {/* <S.CommentInput placeholder="댓글을 입력해주세요." /> */}

      {commentId && description && setIsEdit ? (
        <>
          <S.CommentBtn
            onClick={() => {
              setIsEdit(false);
            }}
          >
            <Icon name="x" size={16} />
          </S.CommentBtn>
          <S.CommentBtn
            onClick={() => {
              onSubmit();
              setText('');
            }}
          >
            <Icon name="pencil" size={16} />
          </S.CommentBtn>
        </>
      ) : (
        <S.CommentBtn
          onClick={() => {
            onSubmit();
            setText('');
          }}
        >
          <Icon name="send" size={16} />
        </S.CommentBtn>
      )}
    </S.Container>
  );
};

export default CommentInput;

const S = {
  Container: styled.form`
    display: flex;
    gap: 8px;
  `,
  InputArea: styled.input`
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
  CommentBtn: styled.div`
    width: 40px;
    /* height: 40px; */
    /* min-width: 40/px; */
    min-height: 40px;
    border-radius: 10px;
    border: none;
    background-color: ${COLORS.GRAY[200]};
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      color: ${COLORS.GREEN[400]};
    }
    cursor: pointer;
  `
};
