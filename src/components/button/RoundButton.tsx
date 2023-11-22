import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import theme from 'src/styles/theme';
import styled, { css } from 'styled-components';

interface RoundButtonProps {
  children: string;
  onClick?: () => void;
  isCheck?: boolean;
  value?: string;
}

// isCheck = true면 초록색, false면 회색
const RoundButton = ({ children, onClick, isCheck }: RoundButtonProps) => {
  return (
    <S.Button onClick={onClick} $isCheck={isCheck}>
      {children}
    </S.Button>
  );
};

export default RoundButton;

interface ButtonStyleProps {
  $isCheck?: boolean;
}

const S = {
  Button: styled.button<ButtonStyleProps>`
    padding: 6px 12px;
    border-radius: 20px;
    outline: none;
    ${styleFont.body4}
    background-color: transparent;

    ${({ $isCheck }) => {
      if ($isCheck) {
        return css`
          color: ${COLORS.GREEN[400]};
          border: 1px solid ${COLORS.GREEN[400]};
        `;
      } else {
        return css`
          color: ${COLORS.GRAY[400]};
          border: 1px solid ${COLORS.GRAY[400]};
        `;
      }
    }}
  `
};
