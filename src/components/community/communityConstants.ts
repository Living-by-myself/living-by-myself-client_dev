export const COMMUNITY_CATEGORY = {
  ALL: {
    name: '전체',
    value: 'ALL'
  },
  FREE: {
    name: '자유',
    value: 'FREE'
  },
  COOK: {
    name: '요리',
    value: 'COOK'
  },
  INTERIOR: {
    name: '인테리어',
    value: 'INTERIOR'
  },
  CLEAN: {
    name: '청소',
    value: 'CLEAN'
  }
} as const;

export const COMMUNITY_SORT = {
  ASC: {
    name: '오름차순',
    value: 'asc'
  },
  DESC: {
    name: '내림차순',
    value: 'desc'
  }
} as const;

export const getCategoryName = (value: any) => {
  const category = Object.values(COMMUNITY_CATEGORY).find((item) => item.value === value);
  return category ? category.name : 'Unknown';
};
