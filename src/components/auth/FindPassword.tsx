import React from 'react'
import { COLORS } from 'src/styles/styleConstants'
import styled from 'styled-components'

const FindPassword = () => {
  return (
    <S.Container>
        <S.Form>
            <S.FormRow>
                <label>이메일</label>
                <input placeholder='이메일'/>
            </S.FormRow>
            <S.FormRow>
                <label>전화번호</label>
                <input placeholder='휴대폰 번호(-없이 숫자만 입력)'/>
                <S.Button>인증번호 받기</S.Button>
                <input placeholder='인증번호 입력'/>
            </S.FormRow>
        <S.Button>비밀번호 찾기</S.Button>
        </S.Form>
    </S.Container>
  )
}

export default FindPassword

const S = {
    Container:styled.div`
        width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 6rem;
    `,
    Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  FormRow: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      display: flex;

      width: 100%;
      border: solid 1px ${COLORS.GRAY[400]};
      border-radius: 6px;
      padding: 0.8rem 1.2rem;
    }
  `,
  Button: styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.8rem 1.2rem;
  background-color: ${COLORS.GREEN[300]};
  color: ${COLORS.GRAY[0]};
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`
}