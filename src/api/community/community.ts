import axios from 'axios';
import { CommunityCategory, CommunityFilter } from 'src/pages/community/CommunityPage';
import { Post } from 'src/types/community/types';
import axiosInstance from '../AxiosInstance';
import { useQueryClient } from '@tanstack/react-query';

export interface getPostListOption {
  page?: number;
  size?: number;
  category: CommunityCategory;
  filter: CommunityFilter;
}

export interface getPostIdOption {
  postId: string | undefined;
}

const token = localStorage.getItem('atk');

const getCommunityPostListURL = (option: getPostListOption) => {
  if (option.category === 'ALL') {
    return 'https://tracelover.shop/home/communities';
  } else {
    return `https://tracelover.shop/home/communities/search?page=${option.page}&size=6&category=${option.category}&keyword=&sort=${option.filter}`;
  }
};

export const getCommunityPostList = async (option: getPostListOption) => {
  try {
    const url = getCommunityPostListURL(option);

    const response = await axios.get(url, {
      withCredentials: true
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

export const getCommunityPostDetail = async (option: getPostIdOption): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/home/communities/${option.postId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCommunityPost = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post('/home/communities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommunityPost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/home/communities/${postId}`, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

interface UpdatePostOption {
  postId: string;
  formData: FormData;
}

export const updateCommunityPost = async ({ postId, formData }: UpdatePostOption) => {
  console.log(postId);
  try {
    const response = await axiosInstance.put(`/home/communities/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const addCommunityPostLike = async (postId: string) => {
  try {
    const response = await axiosInstance.post(`/home/community/${postId}/like`, {}, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommunityPostLike = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/home/community/${postId}/like`, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
