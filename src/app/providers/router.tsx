import { RouterProvider } from 'react-router';

import { appRouting } from '@/pages';

export const Router = () => {
  return <RouterProvider router={appRouting}></RouterProvider>;
};
