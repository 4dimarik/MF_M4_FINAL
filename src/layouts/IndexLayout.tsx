import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { NoteStack } from '../components/NoteStack';
import { IAppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';
import { HeaderBlock } from '../components/HeaderBlock';

export default function IndexLayout() {
  const appState: IAppState | null = useAppState();
  const notes = appState?.notes;

  return (
    <AppShell
      padding="md"
      navbar={notes && <NoteStack />}
      header={<HeaderBlock />}
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
