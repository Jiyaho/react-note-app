import NoteListSidebar from './NoteListSidebar';
import WriteNoteContent from './WriteNoteContent';
import WriteNoteHeader from './WriteNoteHeader';

function WriteNoteLayout() {
  return (
    <>
      <NoteListSidebar />
      <WriteNoteHeader />
      <WriteNoteContent />
    </>
  );
}
export default WriteNoteLayout;
