import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '@/shared/api';
import * as lib from './lib';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: number;
      userData: lib.UpdateUserValues;
    }) => updateUser({ id, ...userData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
