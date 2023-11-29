import { COMMUNITY_CATEGORY, COMMUNITY_SORT } from 'src/components/community/communityConstants';

export interface Post {
  id: number;
  viewCnt: number;
  title: string;
  description: string;
  category: string;
  userId: number;
  userNickname: string;
  getCreatedAtAsString: string;
  commentCnt: number;
  likeCnt: number;
  fileUrls: string | null;
  existsLike?: boolean;
}

export type CommunityCategory = (typeof COMMUNITY_CATEGORY)[keyof typeof COMMUNITY_CATEGORY];

export type CommunityCategoryValues = CommunityCategory['value'];

export type CommunitySort = (typeof COMMUNITY_SORT)[keyof typeof COMMUNITY_SORT];

export type CommunitySortValues = CommunitySort['value'];
