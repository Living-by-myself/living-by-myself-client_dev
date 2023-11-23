export const GROUP_BUY_STATUS = {
  ONGOING: {
    name: '진행중',
    value: 'ONGOING'
  },
  DEADLINE: {
    name: '마감',
    value: 'DEADLINE'
  }
} as const;

export const GROUP_BUY_CATEGORY_SHARE = {
  BUY: {
    name: '구매',
    value: 'BUY'
  },
  SHARE: {
    name: '나눔',
    value: 'SHARE'
  }
} as const;

export const GROUP_BUY_CATEGORIES = {
  ALL: {
    name: '전체',
    value: 'ALL'
  },
  FOOD: {
    name: '음식',
    value: 'FOOD'
  },
  LIFE: {
    name: '생필품',
    value: 'LIFE'
  },
  OTHER: {
    name: '기타',
    value: 'OTHER'
  }
} as const;

export const GROUP_BUY_SORT = {
  ASC: {
    name: '오름차순',
    value: 'asc'
  },
  DESC: {
    name: '내림차순',
    value: 'desc'
  }
} as const;
