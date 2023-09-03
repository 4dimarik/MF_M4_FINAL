import { AppShell, Header } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { NoteStack } from '../components/NoteStack';
import { AppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';

export default function IndexLayout() {
  const appState: AppState | null = useAppState();
  const notes = appState?.notes;
  const activeNote = appState?.activeNote;
  console.log(activeNote);
  return (
    <AppShell
      padding="md"
      navbar={notes && <NoteStack />}
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
      <Outlet />
    </AppShell>
  );
}

// {activeNote?.value ? (
//   <TextEditor activeNote={activeNote?.value} />
// ) : (
//   <Box>Нет заметок</Box>
// )}
