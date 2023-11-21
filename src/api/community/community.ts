import axios from 'axios';
import { CommunityCategory, CommunityFilter } from 'src/pages/community/CommunityPage';
import { Post } from 'src/types/community/types';

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

const token = localStorage.getItem('atk');

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
  try {
    const response = await axios.get(`https://tracelover.shop/home/communities/${option.postId}`, {
      withCredentials: true,

      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentList = async (option: getPostIdOption): Promise<any> => {
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (formData: FormData) => {
  try {
    const response = await axios.post('https://tracelover.shop/home/communities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`https://tracelover.shop/home/communities/${postId}`, {
      headers: {
        Authorization: token
      }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

interface UpdatePostOption {
  postId: string;
  formData: FormData;
}

export const updatePost = async ({ postId, formData }: UpdatePostOption) => {
  console.log(postId);
  try {
    const response = await axios.put(`https://tracelover.shop/home/communities/${postId}`, formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
