import { baseRequest } from '@/shared/api/base';
import {
  GetUserRequestDone,
  GetUsersRequestDone,
  GetUsersRequestParams,
  User,
} from '@/shared/types';

export const fetchUsers = async (
  params: GetUsersRequestParams
): GetUsersRequestDone => {
  const { data } = await baseRequest.get('/users', { params });

  return data;
};

export const fetchUser = async (id: number): GetUserRequestDone => {
  const { data } = await baseRequest.get(`/users/${id}`);

  return data;
};

export const updateUser = async ({ id, ...body }: User) => {
  const { data } = await baseRequest.patch(`users/${id}`, body);

  return data;
};
