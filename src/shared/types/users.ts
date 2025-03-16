export type PaginationParams = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  nextPage?: number | null;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
};

export type GetUsersRequestParams = PaginationParams & {
  firstName?: string;
  lastName?: string;
  city?: string;
};

export type GetUsersRequestDone = Promise<
  PaginationParams & {
    totalPages: number;
    users: User[];
  }
>;

export type GetUserRequestDone = Promise<User>;

export type UpdataUserRequestParams = User;
