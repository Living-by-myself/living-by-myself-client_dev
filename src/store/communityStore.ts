import { CommunityWriteFormData } from 'src/components/community/write/CommunityWriteCategoty';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
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
