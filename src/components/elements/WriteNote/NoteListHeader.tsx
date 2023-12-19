import { useRecoilValue } from 'recoil';
import { selectedNotebookState } from '../../../recoil/atoms';
import { useEffect, useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import getNotebooksData from '../../../utils/getNotebooksData';

function NoteListHeader() {
  const notebook = useRecoilValue(selectedNotebookState)[0];
  const [isMoreButtonClick, setIsMoreButtonClick] = useState(false);
  const [moreOptionsPosition, setMoreOptionsPosition] = useState({ top: 0, left: 0 });
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMoreButton = (e: React.MouseEvent<HTMLDivElement>) => {
    // 버튼의 위치를 계산하여 상태에 저장
    setMoreOptionsPosition({ top: e.clientY, left: e.clientX });
    setIsMoreButtonClick(true);
  };

  const handleDeleteNotebookButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const savedNotebooksList = getNotebooksData();
    const selectedNotebookId = e.currentTarget.id; // 삭제할 노트 id

    // 변경될 리스트: 삭제할 노트북 id와 같지 않은 노트북 리스트들 필터링
    const updatedNotebookList = savedNotebooksList.filter(
      (notebook) => notebook.id !== selectedNotebookId,
    );

    // 삭제 확인 팝업창: 삭제 확인 버튼 누른 경우 아래 로직 실행
    if (window.confirm('Are you sure you want to delete this notebook?')) {
      // localStorage에 변경된 노트북 리스트로 저장
      localStorage.setItem('notebooks', JSON.stringify(updatedNotebookList));
      navigate(`/`);
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
    if (!notebook) {
      navigate('/');
    }

    // MoreOptions 버튼 외부 클릭 시 창 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(e.target as Node)) {
        setIsMoreButtonClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [navigate, notebook, moreOptionsRef]);

  return (
    <header className="z-10 fixed h-10 w-[280px] bg-gray-50 border-gray-200 border-b-[1px] border-r-[1px] px-4">
      <div className="flex h-full items-center justify-between">
        <h1 className=" text-gray-600">{notebook?.name}</h1>
        <div onClick={handleMoreButton} className="cursor-pointer">
          <IoIosMore className="text-gray-500 text-xl hover:text-black" />
        </div>
      </div>
      {isMoreButtonClick && (
        <div
          ref={moreOptionsRef}
          className="absolute p-2 w-32 rounded-md text-xs bg-gray-600 text-white flex flex-col gap-1"
          style={{
            top: moreOptionsPosition.top - 43,
            left: moreOptionsPosition.left - 202,
          }}
        >
          <button
            id={notebook.id}
            onClick={handleDeleteNotebookButton}
            className="hover:bg-blue-400 cursor-pointer p-1 "
          >
            Delete Notebook
          </button>
        </div>
      )}
    </header>
  );
}
export default NoteListHeader;
