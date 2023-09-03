import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import NoteLink from './NoteLink';
import { Note } from '../../../db';

type Props = {
  note: Note;
};

const NoteButton = memo(function NoteButton({ note }: Props) {
  return (
    <NavLink to="/tasks">
      {({ isActive }) => <NoteLink note={note} isActive={isActive} />}
    </NavLink>
  );
});

export default NoteButton;
