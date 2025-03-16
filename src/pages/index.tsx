import { HomeRoute } from '@/pages/home';
import { UsersRouting } from '@/pages/users';
import { Layout } from '@/widgets';
import { createBrowserRouter } from 'react-router';

export const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [HomeRoute, UsersRouting],
  },
]);
