import TagType from './TagType'
import NotebookType from './NotebookType'
import NoteType from './NoteType'

export interface NwRespI<T> {
  status: number;
  statusText: string;
  data: T;
}

export interface NwRespTagsI {
  tags: TagType[];
}

export interface NwRespNotesI {
  notes: NoteType[];
}

export interface NwRespNotebooksI {
  notebooks: NotebookType[];
}