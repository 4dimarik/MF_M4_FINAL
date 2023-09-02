import { MantineProvider, AppShell, Header } from '@mantine/core';
import TextEditor from './components/TextEditor';
import { AppProvider } from './context/AppProvider/ui/AppProvider';
import NoteStack from './components/NoteStack';

function App() {
  const test = true;

  return (
    <AppProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          navbar={<NoteStack />}
          header={
            <Header height={60} p="xs">
              <></>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <TextEditor />
        </AppShell>
      </MantineProvider>
    </AppProvider>
  );
}

export default App;

