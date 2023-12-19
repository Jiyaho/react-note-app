import { useEffect, useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedNotebookState } from '../../../recoil/atoms';
import getNotebooksData from '../../../utils/getNotebooksData';

function WriteNoteHeader() {
  const [isMoreButtonClick, setIsMoreButtonClick] = useState(false);
  const [moreOptionsPosition, setMoreOptionsPosition] = useState({ top: 0, left: 0 });
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const [currentNotebook, setCurrentNotebook] = useRecoilState(selectedNotebookState);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const handleMoreButton = (e: React.MouseEvent<HTMLDivElement>) => {
    // 버튼의 위치를 계산하여 상태에 저장
    setMoreOptionsPosition({ top: e.clientY, left: e.clientX });
    setIsMoreButtonClick(true);
  };

  const handleDeleteNoteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const savedNotebooksList = getNotebooksData();
    const selectedNoteId = e.currentTarget.id; // 삭제할 노트 id

    // 변경될 리스트: 현재 노트북의 노트리스트 중에 삭제할 노트를 제외한 나머지 노트리스트
    const updatedNoteList = currentNotebook[0].noteList.filter((note) => {
      return note.id !== selectedNoteId;
    });

    // 현재 선택된 노트북를 제외한 나머지 노트북 리스트들
    const otherData = savedNotebooksList.filter((notebook) => {
      return notebook.id !== currentNotebook[0].id;
    });

    // 변경된 현재 노트북 데이터
    const newNotebook = { ...currentNotebook[0], noteList: updatedNoteList };

    // 기존 노트북 리스트 + 변경된 현재 노트북 데이터 배열에 함께 저장
    const updatedNotebookList = [...otherData, newNotebook];

    // 삭제 확인 팝업창: 확인 버튼 누른 경우 아래 로직 실행
    if (window.confirm('Are you sure you want to delete this note?')) {
      // localStorage에 변경된 노트북 리스트로 저장
      localStorage.setItem('notebooks', JSON.stringify(updatedNotebookList));

      setCurrentNotebook([newNotebook]); // 변경된 노트북 상태 전달
      navigate(`/notebooks/${currentNotebook[0].id}/write`);
    } else {
      // 삭제 취소 버튼 눌렀을 때, 부모 요소 화면에서 안 보이도록 변경
      const parentElement = e.currentTarget.parentElement;

      if (parentElement) {
        parentElement.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    // 해당 노트북 삭제되어 데이터 없는 경우 메인 페이지로 리다이렉트
    if (!currentNotebook) {
      navigate('/');
    }

    // MoreOptions 버튼 외부 클릭 시 창 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(e.target as Node)) {
        setIsMoreButtonClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [moreOptionsRef, noteId, currentNotebook]);

  return (
    <header className="ml-[280px] mt-[-40px] h-10  bg-gray-50 border-gray-200 border-b-[1px] border-r-[1px] px-4">
      <div className="flex h-full items-center ">
        <div onClick={handleMoreButton} className="cursor-pointer">
          <IoIosMore className="text-gray-500 text-xl hover:text-black" />
        </div>
      </div>
      {isMoreButtonClick && (
        <div
          ref={moreOptionsRef}
          className="absolute p-2 w-26 rounded-md text-xs bg-gray-600 text-white flex flex-col gap-1"
          style={{
            top: moreOptionsPosition.top - 43,
            left: moreOptionsPosition.left,
          }}
        >
          <button
            id={noteId}
            onClick={handleDeleteNoteButton}
            className="hover:bg-blue-400 cursor-pointer p-1 "
          >
            Delete Note
          </button>
        </div>
      )}
    </header>
  );
}
export default WriteNoteHeader;
