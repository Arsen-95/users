import { create } from 'zustand';

type UsersFilterState = {
  filters: Record<string, string | null>;
  setFilters: (filters: Record<string, string | null>) => void;
};

export const useUsersFilterStore = create<UsersFilterState>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
}));
