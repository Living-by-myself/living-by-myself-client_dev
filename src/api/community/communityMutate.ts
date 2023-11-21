import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost } from './community';
interface Props {
  postId: string;
}

const useCommunityMutate = (postId?: string) => {
  const queryclient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryclient.invalidateQueries(['posts', 'ALL']);
    }
  };

  const updateSuccess = {
    onSuccess: () => {
      queryclient.invalidateQueries(['post', postId]);
    }
  };

  const addPostHandler = (formData: FormData) => {
    addPostMutation.mutate(formData);
  };

  const deletePostHandler = (id: string) => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(id);
    } else {
      alert('취소되었습니다.');
    }
  };

  const updatePostHandler = (postId: string, formData: FormData) => {
    if (window.confirm('게시글을 수정 하시겠습니까?')) {
      updateCommentMutation.mutate({ postId, formData });
    } else {
    }
  };

  const addPostMutation = useMutation(addPost, success);
  const deleteCommentMutation = useMutation(deletePost, success);
  const updateCommentMutation = useMutation(updatePost, updateSuccess);

  return {
    addPostMutation,
    deleteCommentMutation,
    updateCommentMutation,
    updatePostHandler,
    deletePostHandler,
    addPostHandler
  };
};
export default useCommunityMutate;
