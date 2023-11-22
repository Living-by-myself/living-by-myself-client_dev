import styled from 'styled-components';
import Icon from '../icon/Icon';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';

interface MyPageMenuCardProps {
  children?: string;
  onClick: () => void;
}

const MyPageMenuCard = ({ children, onClick }: MyPageMenuCardProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.Label>{children}</S.Label>
      <Icon name="chevron-right" size={16} />
    </S.Container>
  );
};

export default MyPageMenuCard;

const S = {
  Container: styled.div`
    padding: 16px 16px;
    border-bottom: 1px solid ${COLORS.GRAY[200]};
    display: flex;
    justify-content: space-between;
  `,
  Label: styled.p`
    ${styleFont.body1}
  `,
  Arrow: styled.div``
};
