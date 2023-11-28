import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCommunityPost, deleteCommunityPost, updateCommunityPost } from './community';
import { communityAPIOptionStore } from 'src/store/communityStore';
interface Props {
  postId: string;
}

const useCommunityMutate = (postId?: string) => {
  const { category, sort, keyword } = communityAPIOptionStore();
  const queryclient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryclient.invalidateQueries(['posts', { category, sort, keyword }]);
    }
  };

  const updateSuccess = {
    onSuccess: () => {
      queryclient.invalidateQueries(['post', postId]);
    }
  };

  const addCommunityPostHandler = (formData: FormData) => {
    addCommunityMutation.mutate(formData);
  };

  const deleteCommunityPostHandler = (id: string) => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteCommunityMutation.mutate(id);
    } else {
      alert('취소되었습니다.');
    }
  };

  const updateCommunityPostHandler = (postId: string, formData: FormData) => {
    if (window.confirm('게시글을 수정 하시겠습니까?')) {
      updateCommunityMutation.mutate({ postId, formData });
    } else {
    }
  };

  const addCommunityMutation = useMutation(addCommunityPost, success);
  const deleteCommunityMutation = useMutation(deleteCommunityPost, success);
  const updateCommunityMutation = useMutation(updateCommunityPost, updateSuccess);

  return {
    addCommunityMutation,
    deleteCommunityMutation,
    updateCommunityMutation,
    updateCommunityPostHandler,
    deleteCommunityPostHandler,
    addCommunityPostHandler
  };
};
export default useCommunityMutate;
