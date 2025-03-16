import { routerMap } from '@/shared/lib';
import { lazy } from 'react';
import { RouteObject } from 'react-router';

const UserPage = lazy(() =>
  import('./page').then((module) => ({ default: module.UserPage }))
);

export const UserRouting: RouteObject = {
  path: routerMap.user,
  element: <UserPage />,
};
