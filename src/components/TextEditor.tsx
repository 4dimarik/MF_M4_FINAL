import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Flex, Input } from '@mantine/core';
import { Note } from '../db';
import notesService from '../services/notesService';
import { AppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';
import NoteActions from './NoteActions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Props = { activeNote: Note };

function TextEditor({ activeNote }: Props) {
  const { id } = useParams();
  const appState: AppState | null = useAppState();

  const isEditable: boolean =
    appState?.activeNote.editable !== undefined
      ? appState?.activeNote.editable
      : false;

  const title: string = activeNote?.title ?? '';
  const content: string = activeNote?.content ?? '';

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateNote = {
      ...activeNote,
      title: event.currentTarget.value,
    } as Note;
    notesService.update(updateNote);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    onUpdate({ editor }) {
      if (content !== editor.getHTML()) {
        console.log('### SAVE Update');
        const updateNote = {
          ...activeNote,
          content: editor.getHTML(),
        } as Note;
        notesService.update(updateNote);
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [id, editor]);

  useEffect(() => {
    if (editor) editor.setEditable(isEditable);
  }, [isEditable, editor]);

  return (
    <>
      <Flex bg="white" justify="end" p="0.5rem">
        <NoteActions />
      </Flex>
      <RichTextEditor editor={editor} sx={{ border: 'none', m: '.5rem' }}>
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
          display={isEditable ? 'flex' : 'none'}
        >
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <Input
          variant="unstyled"
          placeholder="Новая заметка"
          size="xl"
          px="1rem"
          value={title}
          onChange={handleTitleChange}
          bg="white"
          disabled={!isEditable}
          sx={{
            '&>:disabled': {
              backgroundColor: 'initial',
              color: 'initial',
              opacity: 'initial',
            },
          }}
        />
        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}

export default TextEditor;
