import { create } from 'zustand';
import { Genre } from './types/GenreTypes';
import { Platform } from './types/GameTypes';

interface FilterState {
  selectedGenre: Genre | undefined;
  selectedPlatform: Platform  | undefined;
  selectedSort: string;
  searchQuery: string;
  setSelectedGenre: (genre: Genre | undefined) => void;
  setSelectedPlatform: (platform: Platform | undefined) => void;
  setSelectedSort: (sort: string) => void;
  setSearchQuery: (query: string) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  selectedGenre: undefined,
  selectedPlatform: undefined,
  selectedSort: '',
  searchQuery: '',
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  setSelectedSort: (sort) => set({ selectedSort: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useFilterStore;
