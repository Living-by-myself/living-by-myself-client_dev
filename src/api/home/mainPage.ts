import axios from 'axios';
import { HomePageData } from 'src/pages/HomePage';

export const getMainPageData = async (): Promise<HomePageData> => {
  let mainPageData = {
    community: [],
    groupBuy: []
  };

  try {
    const communityResponse = await axios.get('https://tracelover.shop/home/communities/search?page=0&size=5&sort=asc');

    console.log(communityResponse.data);

    mainPageData.community = communityResponse.data.communityResponseDtoList;
  } catch (error) {
    console.log(error);
  }

  try {
    const groupBuyResponse = await axios.get('https://tracelover.shop/home/group-buying/search?page=0&size=5&sort=asc');

    console.log(groupBuyResponse.data);
    mainPageData.groupBuy = groupBuyResponse.data.groupBuyingResponseDtoList;
  } catch (error) {
    console.log(error);
  }

  return mainPageData;
};
