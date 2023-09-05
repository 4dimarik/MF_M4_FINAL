import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Note } from '../db';
import notesService from '../services/notesService';
import { useEffect, memo } from 'react';

type Props = { note: Note; editable: boolean };

function getTitle(htmlString: string) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.querySelector('body>*')?.textContent;
}

const TextEditor = memo(function TextEditor({ note, editable }: Props) {
  console.log('TextEditor');
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
    onUpdate({ editor }) {
      if (content !== editor.getHTML()) {
        const updateNote = {
          ...note,
          title: getTitle(editor.getHTML()),
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
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  return (
    <RichTextEditor editor={editor} sx={{ border: 'none', m: '.5rem' }}>
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={60}
        display={editable ? 'flex' : 'none'}
      >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
          <RichTextEditor.CodeBlock />
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
      <RichTextEditor.Content
        sx={{ '& pre': { backgroundColor: '#d6d8daa6' } }}
      />
    </RichTextEditor>
  );
});

export default TextEditor;
