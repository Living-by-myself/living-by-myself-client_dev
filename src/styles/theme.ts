import { DefaultTheme } from 'styled-components';

const pxToRem = (px: number) => `${px / 10}rem`;

const fontSizes = {
  xxl: pxToRem(22), // h1
  xl: pxToRem(20), // h2
  lg: pxToRem(18), // h3
  base: pxToRem(16), // h4, body1
  sm: pxToRem(14), // body2
  xs: pxToRem(12), // body3, caption
  xxs: pxToRem(10) // body4, caption2
};

const colors = {
  gray: {
    0: '#FFFFFF',
    200: '#EEEEEE',
    300: '#DDDDDD', // normal
    400: '#BDBDBD',
    500: '#8C8C8D',
    600: '#616161',
    700: '#393A40',
    800: '#212121',
    900: '#000000'
  },

  green: {
    0: '#ECFAF6',
    100: '#E3F7F2',
    200: '#C4EEE4',
    300: '#42C8A8', // normal
    400: '#3BB497',
    500: '#35A086',
    600: '#32967E',
    700: '#287865',
    800: '#1E5A4C',
    900: '#17463B'
  },

  red: {
    0: '#FEEBEB',
    100: '#FEE1E1',
    200: '#FCC2C2',
    300: '#F53A3A', // normal
    400: '#DD3434',
    500: '#C42E2E',
    600: '#B82C2C',
    700: '#932323',
    800: '#6E1A1A',
    900: '#561414'
  },

  blue: {
    0: '#ebf3fe',
    100: '#e1edfe',
    200: '#c1dbfc',
    300: '#388af5', // normal
    400: '#327cdd',
    500: '#2d6ec4',
    600: '#2a68b8',
    700: '#225393',
    800: '#193e6e',
    900: '#143056'
  }
};

const breakPoints = {
  pc: 768 // mobile: 0 ~ 767, pc: 768 ~
};

const fontWeights = {
  normal: 400,
  bold: 600
};

export type FontSizesTypes = typeof fontSizes;
export type ColorsTypes = typeof colors;
export type BreakPointsTypes = typeof breakPoints;
export type FontWeightsTypes = typeof fontWeights;

const theme: DefaultTheme = {
  fontSizes,
  colors,
  breakPoints,
  fontWeights
};

export default theme;
