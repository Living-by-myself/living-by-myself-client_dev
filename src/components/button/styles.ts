import styled, { css } from 'styled-components';
import { ButtonColors, ButtonSizes, ButtonVariants } from 'src/types/button/types';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from 'src/components/button/buttonConstants';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';

const getColor = (color: ButtonColors) => {
  switch (color) {
    case BUTTON_COLORS.PRIMARY:
      return COLORS.GREEN[300];
    case BUTTON_COLORS.SUCCESS:
      return COLORS.BLUE[300];
    case BUTTON_COLORS.DANGER:
      return COLORS.RED[300];
    default:
      throw new Error('Invalid color');
  }
};

const getHoverColor = (color: ButtonColors) => {
  switch (color) {
    case BUTTON_COLORS.PRIMARY:
      return COLORS.GREEN[300];
    case BUTTON_COLORS.SUCCESS:
      return COLORS.BLUE[300];
    case BUTTON_COLORS.DANGER:
      return COLORS.RED[300];
    default:
      throw new Error('Invalid color');
  }
};

export const Button = styled.button<{
  variants: ButtonVariants;
  color: ButtonColors;
  size: ButtonSizes;
  $full: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.8rem;
  font-size: ${styleFont.body1};

  width: ${({ $full }) => ($full ? '100%' : 'auto')};

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ variants, color }) => {
    switch (variants) {
      case BUTTON_VARIANTS.CONTAIN:
        return css`
          background-color: ${getColor(color)};
          color: ${COLORS.GRAY[0]};
          border: none;
          &:hover {
            background-color: ${getHoverColor(color)};
          }
          &:disabled {
            background-color: ${COLORS.GRAY[400]};
          }
        `;
      case BUTTON_VARIANTS.OUTLINE:
        return css`
          background-color: ${COLORS.GRAY[0]};
          color: ${getColor(color)};
          border: 1px solid ${getColor(color)};
          &:hover {
            background-color: ${COLORS.GRAY[200]};
          }
          &:disabled {
            border-color: ${COLORS.GRAY[400]};
            color: ${COLORS.GRAY[400]};
          }
        `;
      case BUTTON_VARIANTS.TEXT:
        return css`
          background-color: transparent;
          color: ${COLORS.GRAY[900]};
          border: none;
          font-weight: ${styleFont.body1};
          &:hover {
            background-color: ${COLORS.GRAY[200]};
          }
        `;
      case BUTTON_VARIANTS.LINK:
        return css`
          background-color: transparent;
          color: ${COLORS.GRAY[900]};
          border: none;
          font-weight: ${styleFont.body1};
          text-decoration: underline;
        `;
      case BUTTON_VARIANTS.ICON:
        return css`
          background-color: transparent;
          color: #000;
          border: none;
          font-weight: ${styleFont.body1};
          &:hover {
            background-color: ${COLORS.GRAY[200]};
          }
        `;
      default:
        return '';
    }
  }}

  ${({ size, variants }) => {
    if (variants === BUTTON_VARIANTS.ICON) {
      return css`
        padding: 0.6rem;
      `;
    }
    switch (size) {
      case BUTTON_SIZES.SM:
        return css`
          padding: 10px 20px;
          font-size: ${styleFont.body2};
        `;
      case BUTTON_SIZES.MD:
        return css`
          /* height: 16px; */
          padding: 10px 20px;
        `;
      case BUTTON_SIZES.LG:
        return css`
          font-size: ${styleFont.body1};
          padding: 15px 25px;
        `;
    }
  }}
`;
