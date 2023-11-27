import axios from 'axios';
import { HomePageData } from 'src/pages/HomePage';

export const getMainPageData = async (): Promise<HomePageData> => {
  let mainPageData = {
    community: [],
    groupBuy: []
  };

  try {
    const communityResponse = await axios.get('https://tracelover.shop/home/communities/search?page=0&size=5&sort=asc');

    mainPageData.community = communityResponse.data.communityResponseDtoList;
  } catch (error) {}

  try {
    const groupBuyResponse = await axios.get('https://tracelover.shop/home/group-buying/search?page=0&size=5&sort=asc');

    mainPageData.groupBuy = groupBuyResponse.data.groupBuyingResponseDtoList;
  } catch (error) {}

  return mainPageData;
};
