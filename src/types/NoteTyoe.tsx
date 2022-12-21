interface NotebI {
  title: string;
  customer: string | undefined
  guid: string;
  tags: Array<string>
  created: string;
  updated: string;
}

type NoteType = NoteI;

export default NoteType;



