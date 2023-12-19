export interface NotesType {
  id: string;
  createAt: string;
  title: string;
  content: string;
}

export interface NotebooksType {
  id: string;
  name: string;
  coverColor: string;
  noteList: NotesType[] | [];
}
