import { DefaultTheme } from 'styled-components';

const breakPoints = {
  pc: 768 // mobile: 0 ~ 767, pc: 768 ~
};

export type BreakPointsTypes = typeof breakPoints;

const theme: DefaultTheme = {
  breakPoints
};

export default theme;
