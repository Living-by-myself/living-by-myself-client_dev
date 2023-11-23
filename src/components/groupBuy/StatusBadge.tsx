import { BadgeVariants } from 'src/types/button/types';
import styled, { css } from 'styled-components';
import { BADGE_VARIANTS } from '../button/buttonConstants';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';

interface BadgeProps {
  variant?: BadgeVariants;
  children: React.ReactNode;
}

const StatusBadge = ({ variant = 'primary', children }: BadgeProps) => {
  return <S.Badge variant={variant}>{children}</S.Badge>;
};

export default StatusBadge;

const S = {
  Badge: styled.div<{ variant: BadgeVariants }>`
    display: inline-flex;
    align-items: center;
    border-radius: 1px;
    padding: 4px 8px;
    ${styleFont.body3}
    font-weight: 600;
    color: ${COLORS.GRAY[800]};
    border: none;

    ${({ variant, theme }) => {
      switch (variant) {
        case BADGE_VARIANTS.PRIMARY:
          return css`
            background-color: ${COLORS.GRAY[800]};
          `;
        case BADGE_VARIANTS.SECONDARY:
          return css`
            background-color: ${COLORS.GRAY[200]};
            color: ${COLORS.GRAY[800]};
          `;
        case BADGE_VARIANTS.OUTLINE:
          return css`
            background-color: ${COLORS.GRAY[0]};
            color: ${COLORS.GRAY[800]};
            box-shadow: 0 0 0 1px ${COLORS.GRAY[300]} inset;
          `;
        case BADGE_VARIANTS.SUCCESS:
          return css`
            background-color: ${COLORS.BLUE[300]};
          `;
        case BADGE_VARIANTS.DANGER:
          return css`
            background-color: ${COLORS.RED[300]};
          `;
        default:
          throw new Error('Invalid Badge variant');
      }
    }}
  `
};
