import { LinkProps as RLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { Link as RLink } from 'react-router-dom';
import { LinkBold, LinkSize } from 'src/types/button/types';
import { LINK_SIZE } from 'src/components/button/buttonConstants';
import { COLORS } from 'src/styles/styleConstants';

interface LinkProp extends RLinkProps {
  bold?: LinkBold;
  size?: LinkSize;
}

const Link = ({ size = 'md', children, bold = false, ...props }: LinkProp) => {
  return (
    <S.Link size={size} $bold={bold} {...props}>
      {children}
    </S.Link>
  );
};

export default Link;

const S = {
  Link: styled(RLink)<{ size: LinkSize; $bold: LinkBold }>`
    color: ${COLORS.GRAY[800]};
    text-decoration: ${({ $bold }) => ($bold ? 'underline' : 'none')};

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  `
};

/* font-weight: ${({ theme, $bold }) => ($bold ? theme.fontWeights.bold : theme.fontWeights.normal)};
font-size: ${({ size, theme }) => {
  switch (size) {
    case LINK_SIZE.SM:
      return theme.fontSizes.base;
    case LINK_SIZE.MD:
      return theme.fontSizes.sm;
    case LINK_SIZE.LG:
      return theme.fontSizes.xs;
    default:
      throw new Error('Invalid size');
  }
}} */
