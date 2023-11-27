import React from 'react'
import styled from 'styled-components'

const PointCharge = () => {
  return (
    <S.Container>
      <S.Title>포인트 충전</S.Title>
    </S.Container>
  )
}

export default PointCharge

const S = {
  Container:styled.div`
  width: 100%;
  max-width: 400px;
  `,
  Title:styled.h1`
        display: flex;
    justify-content: center;
    padding: 5.5rem;
    font-size: 38px;
  `
}