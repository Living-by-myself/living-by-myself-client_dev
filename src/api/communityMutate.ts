import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from './community';
interface Props {
  postId: string;
}
