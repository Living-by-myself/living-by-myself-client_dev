import axios from 'axios';
import axiosInstance from '../AxiosInstance';
import { getPostIdOption } from '../community/community';

const token = localStorage.getItem('atk');

interface PostCommentOption {
  postId: string;
  comment: string;
}

export const getCommentList = async (option: getPostIdOption): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/home/community/${option.postId}/comments?page=0&size=10`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async ({ postId, comment }: PostCommentOption) => {
  try {
    const response = await axiosInstance.post(
      `/home/community/${postId}/comments`,
      {
        description: comment
      },
      {}
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/home/community/comments/${commentId}`, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

interface UpdateCommentOption {
  commentId: string;
  comment: string;
}

export const updateComment = async ({ commentId, comment }: UpdateCommentOption) => {
  try {
    const response = await axiosInstance.patch(
      `/home/community/comments/${commentId}`,
      {
        description: comment
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const addCommentLike = async (commentId: string) => {
  try {
    const response = await axiosInstance.post(`/home/community/comment/${commentId}/like`, {}, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentLike = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/home/community/comment/${commentId}/like`, {});
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
