import { useForm } from 'react-hook-form';

import InputImages from './InputImages';
import styled from 'styled-components';
import axios, { AxiosPromise } from 'axios';
import CommunityWriteCategory, { CommunityWriteFormData } from './CommunityWriteCategoty';
import CommunityWriteText from './CommunityWriteText';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommunityResponse {
  msg: string;
  stausCode: number;
}

const CommunityWriteForm = () => {
  return (
    <S.Container>
      <form onSubmit={() => {}}>
        {/* 작성버튼을 눌러야함 근데 그 작성버튼은 상위 컴포넌트에 있어야함 */}

        {/* 카테고리 */}
        <CommunityWriteCategory />

        {/* 이미지 */}
        <S.ImageContainer>
          <InputImages />
        </S.ImageContainer>
        <S.TextContainer>
          <CommunityWriteText />
        </S.TextContainer>
      </form>
    </S.Container>
  );
};

export default CommunityWriteForm;

const S = {
  Container: styled.div`
    width: 100%;
  `,
  TextContainer: styled.div`
    padding: 0 16px;
  `,
  ImageContainer: styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
  `
};
