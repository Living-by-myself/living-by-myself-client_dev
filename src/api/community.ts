import axios from 'axios';
import { CommunityCategory, CommunityFilter } from 'src/pages/community/CommunityPage';
import { Post } from 'src/types/community/types';
import { token } from './testAuth';
import { useQueryClient } from '@tanstack/react-query';

interface getPostListOption {
  page?: number;
  size?: number;
  category: CommunityCategory;
  filter: CommunityFilter;
}

interface getPostIdOption {
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

    if (option.category === 'ALL') {
      return response.data;
    } else {
      return response.data.communityResponseDtoList;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostDetail = async (option: getPostIdOption): Promise<any> => {
  console.log(option.postId);

  try {
    const response = await axios.get(`https://tracelover.shop/home/communities/${option.postId}`, {
      withCredentials: true,

      headers: {
        Authorization: token
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentList = async (option: getPostIdOption): Promise<any> => {
  console.log(option.postId);
  try {
    const response = await axios.get(
      `https://tracelover.shop/home/community/${option.postId}/comments?page=0&size=10`,
      {
        withCredentials: true,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

interface PostCommentOption {
  postId: string;
  comment: string;
}
export const postComment = async ({ postId, comment }: PostCommentOption) => {
  console.log(comment);
  try {
    const response = await axios.post(
      `https://tracelover.shop/home/community/${postId}/comments`,
      {
        description: comment
      },
      {
        withCredentials: true,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
