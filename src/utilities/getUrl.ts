import { getGroupBuyListOption } from 'src/api/groupBuy/groupBuy';

export const getGroupBuyListURL = (option: getGroupBuyListOption): string => {
  const base_url = 'home/group-buying';

  let url = `${base_url}/search?page=${option.page}`;

  if (option.category && option.category !== 'ALL') {
    url += `&category=${option.category}`;
  }

  if (option.category_share && option.category_share !== 'ALL') {
    url += `&category_share=${option.category_share}`;
  }

  if (option.category_status === 'ONGOING') {
    url += `&category_status=${option.category_status}`;
  }

  if (option.address) {
    url += `&address=${option.address}`;
  }

  if (option.keyword) {
    url += `&keyword=${option.keyword}`;
  }

  url += `&sort=${option.sort}`;

  return url;
};
