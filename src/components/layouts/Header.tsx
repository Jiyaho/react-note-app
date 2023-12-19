import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrRefresh } from 'react-icons/gr';
import { HiOutlineSquare2Stack } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { selectedNotebookState } from '../../recoil/atoms';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const notebookId = useRecoilValue(selectedNotebookState)[0]?.id;
  const location = useLocation();
  const navigate = useNavigate();

  // 특정 notebook을 선택한 경로에 있을 때만 버튼 활성화
  const isNewNoteActive = notebookId && location.pathname.includes(`/notebooks/${notebookId}`);

  const handleClickNewNoteButton = () => {
    navigate(`/notebooks/${notebookId}/write`);
  };
  const handleClickBackButton = () => navigate(-1);
  const handleClickForwardButton = () => navigate(+1);

  return (
    <header className="flex justify-between px-4 py-1.5 border-b-[1px] border-gray-200">
      <div className="flex gap-4 items-center text-gray-600 text-lg">
        <AiOutlineMenu className="cursor-not-allowed text-gray-300" />
        <button onClick={handleClickBackButton}>
          <IoIosArrowBack className="text-gray-500 hover:text-black" />
        </button>
        <button onClick={handleClickForwardButton}>
          <IoIosArrowForward className="text-gray-500 hover:text-black" />
        </button>
        <button disabled>
          <GrRefresh className="cursor-not-allowed text-gray-300" />
        </button>
      </div>
      <div className="flex gap-4 items-center text-gray-600 text-lg">
        <button
          onClick={handleClickNewNoteButton}
          disabled={!isNewNoteActive}
          className={`flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white rounded w-24 h-8 text-sm ${
            !isNewNoteActive ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          New Note
        </button>
        {/* 아래 버튼들은 기능 미구현으로 커서 사용 불가 스타일 적용 */}
        <HiOutlineSquare2Stack className="cursor-not-allowed text-gray-300" />
        <IoSettingsOutline className="cursor-not-allowed text-gray-300" />
      </div>
    </header>
  );
}

export default Header;
