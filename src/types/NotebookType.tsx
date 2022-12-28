import NoteType from './NoteType'

interface NotebookI {
  name: string;
  guid: string;
  stack: string;
  notes: NoteType[] | undefined;
}

type NotebookType = NotebookI;

export default NotebookType;

