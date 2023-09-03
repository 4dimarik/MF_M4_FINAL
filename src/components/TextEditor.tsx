import { useState, useEffect } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Input } from '@mantine/core';
import { Note } from '../db';
import notesService from '../services/notesService';

type Props = { activeNote: Note };

function TextEditor({ activeNote }: Props) {
  console.log('### TextEditor');
  const [note, setNote] = useState<Note>(activeNote);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateNote = {
      ...note,
      title: event.currentTarget.value,
    } as Note;
    setNote(updateNote);
    console.log('#### Change Title');
  };

  useEffect(() => {
    setTimeout(notesService.update, 500, note);
  }, [note]);

  const title: string = note?.title ?? '';
  const content: string = note?.content ?? '';

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
    content,
  });

  if (editor) {
    editor.setEditable(false);
  }

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60} display="none">
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
        pl="1rem"
        value={title}
        onChange={handleTitleChange}
      />
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export default TextEditor;
