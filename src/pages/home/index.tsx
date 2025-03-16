import { lazy } from 'react';
import { RouteObject } from 'react-router';

import { routerMap } from '@/shared/lib';

const HomePage = lazy(() =>
  import('./page').then((module) => ({ default: module.HomePage }))
);

export const HomeRoute: RouteObject = {
  path: routerMap.home,
  element: <HomePage />,
};
