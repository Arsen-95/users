import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router';

import { routerMap } from '@/shared/lib';
import { UserRouting } from '@/pages/users/user';

const UsersPage = lazy(() =>
  import('./page').then((module) => ({ default: module.UserPage }))
);

export const UsersRouting: RouteObject = {
  path: routerMap.users,
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <UsersPage />,
    },
    UserRouting,
  ],
};
