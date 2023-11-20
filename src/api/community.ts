import axios from 'axios';
import { CommunityCategory, CommunityFilter } from 'src/pages/community/CommunityPage';
import { Post } from 'src/types/community/types';

interface getPostListOption {
  page?: number;
  size?: number;
  category: CommunityCategory;
  filter: CommunityFilter;
}

interface getPostDetailOption {
  postId: string | undefined;
}

const getPostListURL = (option: getPostListOption) => {
  if (option.category === 'ALL') {
    return 'https://tracelover.shop/home/communities';
  } else {
    return `https://tracelover.shop/home/communities/search?page=${option.page}&size=6&category=${option.category}&keyword=&sort=${option.filter}`;
  }
};

export const getPostList = async (option: getPostListOption) => {
  try {
    const url = getPostListURL(option);

    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);

    if (option.category === 'ALL') {
      return response.data;
    } else {
      return response.data.communityResponseDtoList;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostDetail = async (option: getPostDetailOption): Promise<any> => {
  console.log(option.postId);

  try {
    const response = await axios.get(`https://tracelover.shop/home/communities/${option.postId}`, {
      withCredentials: true,

      headers: {
        Authorization:
          //토큰 은 나중에 변경
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZXIwNjA4OEBuYXZlci5jb20iLCJhdXRoIjoiTUVNQkVSIiwiZXhwIjoxNzAwNDYwMzI5LCJpYXQiOjE3MDA0NTY3Mjl9.UkG0_fK5LC2SYwVkQ25JHTjXdF81rbb50Xmp9sjGQFc',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
