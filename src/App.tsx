import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import IndexLayout from './layouts/IndexLayout';
import SuspenseComponent from './components/SuspenseComponent';
import { MantineProvider } from '@mantine/core';
import IndexPage from './pages/IndexPage';

const NotePage = lazy(() => import('./pages/NotePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <IndexLayout />,
      children: [
        {
          index: true,
          element: <IndexPage />,
        },
        {
          path: ':id',
          element: (
            <SuspenseComponent>
              <NotePage />
            </SuspenseComponent>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <SuspenseComponent>
          <NotFoundPage />
        </SuspenseComponent>
      ),
    },
  ]);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {elements}
    </MantineProvider>
  );
}

export default App;

