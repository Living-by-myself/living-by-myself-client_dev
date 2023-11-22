import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, postComment, updateComment } from './comment';
interface Props {
  postId: string;
}

const useCommentMutate = (postId?: string) => {
  const queryclient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryclient.invalidateQueries(['comment', postId]);
    }
  };
  const updateSuccess = {
    onSuccess: () => {
      queryclient.invalidateQueries(['comment', postId]);
    }
  };

  const WriteComment = (postId: string, comment: string) => {
    if (comment.trim() === '') {
      return;
    }
    writeCommentMutation.mutate({ comment, postId });
  };

  const deleteCommentHandler = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(id);
    } else {
      alert('취소되었습니다.');
    }
  };

  const updateCommentHandler = (commentId: string, updateComment: string) => {
    if (window.confirm('댓글을 수정 하시겠습니까?')) {
      const newComment = {
        commentId,
        comment: updateComment
      };
      updateCommentMutation.mutate(newComment);
    } else {
    }
  };

  const writeCommentMutation = useMutation(postComment, success);
  const deleteCommentMutation = useMutation(deleteComment, success);
  const updateCommentMutation = useMutation(updateComment, updateSuccess);

  return {
    writeCommentMutation,
    deleteCommentMutation,
    updateCommentMutation,
    updateCommentHandler,
    deleteCommentHandler,
    WriteComment
  };
};
export default useCommentMutate;
