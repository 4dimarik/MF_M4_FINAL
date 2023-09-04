import { Title } from '@mantine/core';
import { IAppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';

export default function NotFoundNotePage() {
  const appState: IAppState | null = useAppState();
  const searchText = appState?.search.value;
  return (
    <Title order={3}>По Вашему запросу "{searchText}" ничего не найдено.</Title>
  );
}
