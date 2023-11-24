import React from 'react';
import styled from 'styled-components';
const GroupBuyWriteForm = () => {
  return (
    <S.Container>
      <div>이미지</div>
      <div>제목</div>
      <div>공동구매 물품 링크</div>
      <div>가격</div>
      <div>인원</div>
      <div>설명</div>
      <div>거래희망장소</div>
      <button>거래희망장소</button>
    </S.Container>
  );
};

export default GroupBuyWriteForm;
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
    background-color: gray;
  `,

  InputWrapper: styled.div``,
  Input: styled.input``,
  Label: styled.p``
};
