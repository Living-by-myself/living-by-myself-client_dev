import axios from 'axios';

import { CommunityCategoryValues, Post } from 'src/types/community/types';
import axiosInstance from '../AxiosInstance';
import { useQueryClient } from '@tanstack/react-query';
import {
  getCommunityPostListAPIOption,
  getCommunityPostListOption,
  getCommunityPostListURL
} from 'src/utilities/getUrl';
import { CommunityQueryData } from 'src/pages/community/CommunityPage';

export interface getPostIdOption {
  postId: string | undefined;
}

const token = localStorage.getItem('atk');

export const getCommunityPostList = async ({ option, page }: getCommunityPostListAPIOption) => {
  try {
    const url = getCommunityPostListURL({ option, page });

    const response = await axios.get(url, {
      withCredentials: true
    });
    // 가져온 게시글
    const data = response.data.communityResponseDtoList as Post[];

    // 전체 게시글 수
    const allPostCount = response.data.len;

    // 전체 페이징 수
    const allPageCount = Math.ceil(allPostCount / 10);
    const returnData = { data, totalPages: allPageCount, page };
    return returnData;
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
