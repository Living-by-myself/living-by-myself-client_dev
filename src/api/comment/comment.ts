import axios from 'axios';

const token = localStorage.getItem('atk');

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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(`https://tracelover.shop/home/community/comments/${commentId}`, {
      withCredentials: true,
      headers: {
        Authorization: token
      }
    });
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
    const response = await axios.patch(
      `https://tracelover.shop/home/community/comments/${commentId}`,
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
