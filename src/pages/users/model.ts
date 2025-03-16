import { useInfiniteQuery } from '@tanstack/react-query';
import { create } from 'zustand';

import { usersFilterModel } from '@/features/user-filter';
import { fetchUsers } from '@/shared/api/domains/users';
import { PAGE_LIMIT } from '@/shared/constants';
import { User } from '@/shared/types';

type UsersState = {
  users: User[];
  total?: number | null;
  addUsers: (users: User[]) => void;
  clearUsers: () => void;
  setTotal: (number?: number) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: null,
  addUsers: (newUsers) =>
    set(() => ({
      users: newUsers,
    })),
  clearUsers: () => set({ users: [] }),
  setTotal: (number) => set(() => ({ total: number })),
}));

export const useUsers = () => {
  const { filters } = usersFilterModel.useUsersFilterStore();
  const { clearUsers } = useUsersStore();

  return useInfiniteQuery({
    queryKey: ['users', filters],
    queryFn: ({ pageParam = 1 }) => {
      if (pageParam === 1) clearUsers();

      return fetchUsers({
        page: pageParam,
        limit: PAGE_LIMIT,
        ...filters,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
