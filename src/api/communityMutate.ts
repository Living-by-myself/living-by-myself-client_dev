import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from './community';
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

  // const deleteCommentButton = (id: string) => {
  //   if (window.confirm('댓글을 삭제하시겠습니까?')) {
  //     deleteCommentMutation.mutate(id);
  //   } else {

  //   }
  // };

  // const updateCommentButton = (id: string, updateComment: string) => {
  //   if (window.confirm('댓글을 수정 하시겠습니까?')) {
  //     const newComment = {
  //       id,
  //       comment: updateComment
  //     };
  //     updateCommentMutation.mutate(newComment);
  //   } else {

  //   }
  // };

  const writeCommentMutation = useMutation(postComment, success);
  // const deleteCommentMutation = useMutation(deleteCommentData, success);
  // const updateCommentMutation = useMutation(updateCommentData, updateSuccess);

  return {
    writeCommentMutation,
    //   deleteCommentMutation,
    //   updateCommentMutation,
    //   updateCommentButton,
    //   deleteCommentButton,
    WriteComment
  };
};
export default useCommentMutate;
