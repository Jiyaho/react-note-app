import EditNoteContent from './EditNoteContent';
import NoteListSidebar from '../WriteNote/NoteListSidebar';
import WriteNoteHeader from '../WriteNote/WriteNoteHeader';

function EditNoteLayout() {
  return (
    <>
      <NoteListSidebar />
      <WriteNoteHeader />
      <EditNoteContent />
    </>
  );
}
export default EditNoteLayout;
