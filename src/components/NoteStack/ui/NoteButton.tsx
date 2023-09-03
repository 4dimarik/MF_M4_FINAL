import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import NoteLink from './NoteLink';
import { Note } from '../../../db';
import '../css/NavLink.css';

type Props = {
  note: Note;
};

const NoteButton = memo(function NoteButton({ note }: Props) {
  return (
    <NavLink to={`/${note.id}`} className="navlink">
      {({ isActive }) => <NoteLink note={note} isActive={isActive} />}
    </NavLink>
  );
});

export default NoteButton;
