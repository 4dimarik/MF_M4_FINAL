import { MantineProvider } from '@mantine/core';
import { AppRouter } from './context/router/ui/AppRouter.tsx';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppRouter />
    </MantineProvider>
  );
}

export default App;

