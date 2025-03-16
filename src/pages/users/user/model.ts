import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

import { fetchUser, updateUser } from '@/shared/api';
import { User } from '@/shared/types';

export type UserData = Omit<User, 'id'>;

type UserStore = {
  user: User | null;
  setUser: (user?: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UserData }) =>
      updateUser({ id, ...userData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
