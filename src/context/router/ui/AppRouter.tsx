import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import IndexLayout from '../../../layouts/IndexLayout';
import SuspenseComponent from '../../../components/SuspenseComponent';
import IndexPage from '../../../pages/IndexPage';
import { PrivateRoute } from './PrivateRoute';

const NotePage = lazy(() => import('../../../pages/NotePage'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage'));
const SignInPage = lazy(() => import('../../../pages/SignInPage'));

function AppRouter() {
  const routes = [
    {
      path: '/',
      element: (
        <PrivateRoute>
          <IndexLayout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <IndexPage />,
        },
        {
          path: 'note/:id',
          element: (
            <SuspenseComponent>
              <NotePage />
            </SuspenseComponent>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <SuspenseComponent>
          <SignInPage />
        </SuspenseComponent>
      ),
    },
    {
      path: '*',
      element: (
        <SuspenseComponent>
          <NotFoundPage />
        </SuspenseComponent>
      ),
    },
  ];

  return useRoutes(routes);
}

export { AppRouter };
