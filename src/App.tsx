import { MantineProvider } from '@mantine/core';
import { AppRouter } from './context/router/ui/AppRouter.tsx';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;

