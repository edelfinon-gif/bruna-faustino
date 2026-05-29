import { create } from 'zustand';
interface FilterState {
  categoryId: string;
  maxPrice: number;
  searchQuery: string;
  selectedTags: string[];
  setCategoryId: (id: string) => void;
  setMaxPrice: (price: number) => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
}
export const useFilterStore = create<FilterState>((set) => ({
  categoryId: 'all',
  maxPrice: 100,
  searchQuery: '',
  selectedTags: [],
  setCategoryId: (id) => set({ categoryId: id }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.includes(tag)
      ? state.selectedTags.filter((t) => t !== tag)
      : [...state.selectedTags, tag]
  })),
  resetFilters: () => set({
    categoryId: 'all',
    maxPrice: 100,
    searchQuery: '',
    selectedTags: []
  }),
}));