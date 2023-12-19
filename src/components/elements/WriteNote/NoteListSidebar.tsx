import { useRecoilValue, useSetRecoilState } from 'recoil';
import NoteListHeader from './NoteListHeader';
import { selectedNoteState, selectedNotebookState } from '../../../recoil/atoms';
import { useLocation, useNavigate } from 'react-router-dom';

function NoteListSidebar() {
  const currentNotebook = useRecoilValue(selectedNotebookState)[0];
  const setSelectedNoteState = useSetRecoilState(selectedNoteState);
  const noteList = currentNotebook.noteList;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickNoteList = (e: React.MouseEvent<HTMLUListElement>) => {
    const clickedId = e.currentTarget.id;

    // 선택한 노트의 데이터를 상태 전달
    const currentNoteData = noteList.filter((note) => note.id === clickedId);
    setSelectedNoteState(currentNoteData);

    // 해당 노트의 편집 페이지로 이동
    navigate(`/notebooks/${currentNotebook.id}/write/${clickedId}`);
  };

  return (
    <>
      <NoteListHeader />
      <aside className="fixed z-0 top-20 w-[280px] h-full flex flex-col border-r-[1px] border-gray-200 overflow-scroll overflow-y-auto">
        {noteList.map((note, index) => (
          <ul
            key={index}
            id={note.id}
            onClick={handleClickNoteList}
            className={`p-4  flex flex-col gap-2 border-gray-200 border-b-[1px] cursor-pointer ${
              location.pathname.includes(note.id) ? 'bg-blue-100' : ''
            }`}
          >
            <li className="text-gray-600 ">{note.title}</li>
            <li className="text-gray-500 text-sm">{note.content}</li>
            <li className="text-gray-400 text-xs">{note.createAt}</li>
          </ul>
        ))}
      </aside>
    </>
  );
}
export default NoteListSidebar;
