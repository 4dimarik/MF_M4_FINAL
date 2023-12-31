import { memo } from 'react';
import { NavLink } from '@mantine/core';
import { NoteDTView } from '../../NoteDTView';
import { Note } from '../../../db';

type Props = {
  note: Note;
  isActive: boolean;
};

const NoteLink = memo(function NoteLink({ note, isActive }: Props) {
  return (
    <NavLink
      key={note.id}
      component="div"
      label={note.title}
      description={<NoteDTView dt={note.updatedAt} />}
      active={isActive}
    />
  );
});

export default NoteLink;
