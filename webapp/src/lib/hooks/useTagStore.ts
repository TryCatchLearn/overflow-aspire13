import { create } from 'zustand';
import { Tag } from '../types';

type TagStore = {
    tags: Tag[];
    setTags: (tags: Tag[]) => void;
    getTagBySlug: (slug: string) => Tag | undefined;
};

export const useTagStore = create<TagStore>((set, get) => ({
    tags: [],
    setTags: (tags) => set({ tags }),
    getTagBySlug: (slug) => get().tags.find((t) => t.slug === slug),
}));
