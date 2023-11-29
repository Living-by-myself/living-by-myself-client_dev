export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  OUTLINE: 'outline'
} as const;

export const BUTTON_VARIANTS = {
  CONTAIN: 'contain',
  OUTLINE: 'outline',
  TEXT: 'text',
  LINK: 'link',
  ICON: 'icon'
} as const;

export const BUTTON_COLORS = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger'
} as const;

export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const LINK_SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const SNS_BUTTONS = {
  KAKAO: 'kakao',
  GOOGLE: 'google'
} as const;

export const TITLE_LEVELS = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4
} as const;

export const TYPOGRAPHY_VARIANTS = {
  BODY1: 'body1',
  BODY2: 'body2',
  BODY3: 'body3',
  BODY4: 'body4',
  CAPTION1: 'caption1',
  CAPTION2: 'caption2'
} as const;

export const NAV_LINKS = [
  {
    id: 1,
    name: '홈',
    href: '/',
    icon: 'home'
  },
  {
    id: 2,
    name: '공동구매',
    href: '/group-buy',
    icon: 'users-2'
  },
  {
    id: 3,
    name: '커뮤니티',
    href: '/community',
    icon: 'laugh'
  },
  {
    id: 4,
    name: '마이페이지',
    href: '/mypage',
    icon: 'user-circle-2'
  }
] as const;
