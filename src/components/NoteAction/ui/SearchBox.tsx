import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAppState } from '../../../context/AppProvider';
import { ISearch, IAppState } from '../../../context/AppProvider/models';
import { IChangeEventHandler } from '../../../models';

function SearchBox() {
  console.log('SearchBox');
  const appState: IAppState | null = useAppState();
  const { value: search, setValue: setSearch } = appState?.search as ISearch;

  const handleChangeSearch: IChangeEventHandler = (event) => {
    setSearch(event.currentTarget.value.trim());
  };
  console.log(search !== '');

  return (
    <TextInput
      placeholder="Поиск"
      icon={<IconSearch size="0.8rem" />}
      size="xs"
      ml="sm"
      value={search}
      onChange={handleChangeSearch}
      autoFocus={search !== ''}
    />
  );
}

export { SearchBox };
