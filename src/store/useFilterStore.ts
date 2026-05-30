import { create } from 'zustand';
export const DEFAULT_MAX_PRICE = 100;
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
  maxPrice: DEFAULT_MAX_PRICE,
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
    maxPrice: DEFAULT_MAX_PRICE,
    searchQuery: '',
    selectedTags: []
  }),
}));
/**
 * Helper to check if any filters are active.
 * Used in components to decide between "Empty State" and "Loading/Default State".
 */
export const checkIsFilterActive = (state: FilterState) => {
  return (
    state.categoryId !== 'all' ||
    state.searchQuery !== '' ||
    state.selectedTags.length > 0 ||
    state.maxPrice !== DEFAULT_MAX_PRICE
  );
};