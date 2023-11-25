import { CommunityWriteFormData } from 'src/components/community/write/CommunityWriteCategoty';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
import { CommunityCategoryValues, CommunitySortValues } from 'src/types/community/types';
import { getCommunityPostListOption } from 'src/utilities/getUrl';
import zustand, { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CommunityWriteStore {
  title: string;
  description: string;
  category: CommunityCategory;

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: CommunityCategory) => void;
}

interface CommunityWriteImageStore {
  files: File[];
  setFiles: (files: File[]) => void;
  removeFile: (file: File) => void;
}

export const communityWriteStore = create<CommunityWriteStore>()(
  devtools((set) => ({
    title: '',
    description: '',
    category: 'FREE',
    setTitle: (title: string) => set({ title }),
    setDescription: (description: string) => set({ description }),
    setCategory: (category: CommunityCategory) => {
      set({ category });
    }
  }))
);

export const communityWriteImageStore = create<CommunityWriteImageStore>()(
  devtools((set, get) => ({
    files: [],
    setFiles: (files: File[]) => set({ files }),
    removeFile: (file: File) => {
      const { files } = get();
      const newFiles = files!.filter((f) => f !== file);
      set({ files: newFiles });
    }
  }))
);

// export interface CommunityAPI {category: CommunityCategoryValues;
//     sort: CommunitySortValues;
//     keyword: string;}

export interface getCommunityPostListOptionStore {
  category?: CommunityCategoryValues;
  keyword?: string;
  sort: CommunitySortValues;
  setCategory: (category: CommunityCategoryValues) => void;
  setSort: (sort: CommunitySortValues) => void;
  setKeyword: (keyword: string) => void;
}

export const communityAPIOptionStore = create<getCommunityPostListOptionStore>()(
  devtools((set, get) => ({
    category: 'ALL',
    sort: 'desc',
    keyword: '',
    setCategory: (category: CommunityCategory) => {
      set({ category });
    },
    setSort: (sort: 'asc' | 'desc') => {
      set({ sort });
    },
    setKeyword: (keyword: string) => {
      set({ keyword });
    }
  }))
);
