import { IoAdd } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import ArrowRotate from './fragments/ArrowRotate';
import {
  createNotebookModalState,
  notebooksListOpenState,
  selectedNotebookState,
} from '../../../recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import OpenCreateNotebookModal from '../../features/modals/CreateNotebook/OpenCreateNotebookModal';
import SidebarNotebookList from './fragments/SidebarNotebookList';
import getNotebooksData from '../../../utils/getNotebooksData';
import handleDeleteButton from '../../../utils/handleDeleteNotebookButton';
import { useEffect } from 'react';

function Sidebar() {
  const [isNotebooksListOpen, setIsNotebooksListOpen] = useRecoilState(notebooksListOpenState);
  const setAddNotebookModalOpen = useSetRecoilState(createNotebookModalState);
  const setNotebookState = useSetRecoilState(selectedNotebookState);
  const savedNotebooksList = getNotebooksData();
  const navigate = useNavigate();

  const handleNotebooksButton = () => setIsNotebooksListOpen(!isNotebooksListOpen);

  // 선택한 노트북에 대한 페이지로 이동
  const handleNotebookCoverButton = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedNotebookId = e.currentTarget.id;

    // 선택한 노트북에 대한 데이터 필터링
    const currentNotebookData = savedNotebooksList.filter(
      (notebook) => notebook.id === selectedNotebookId,
    );

    // 선택한 노트북 상태 저장
    setNotebookState(currentNotebookData);

    // 생성된 노트없는 경우
    if (currentNotebookData[0].noteList.length === 0) {
      navigate(`/notebooks/${selectedNotebookId}`);
    } else {
      // 생성된 노트있는 경우 편집 페이지로 이동
      navigate(`/notebooks/${selectedNotebookId}/write`);
    }
  };

  useEffect(() => {
    if (savedNotebooksList.length === 0) {
      navigate(`/`);
    }
  }, []);

  return (
    <aside className="z-10 fixed w-52 h-full py-2 flex flex-col gap-4 border-r-[1px] border-gray-200">
      <section>
        <div className="flex gap-1 px-1 items-center">
          <ArrowRotate isOpenList={isNotebooksListOpen} onClick={handleNotebooksButton} />
          <Link to={`/notebooks`} className="text-sm text-sky-600 font-semibold">
            NOTEBOOKS
          </Link>
          <OpenCreateNotebookModal
            children={
              <button
                onClick={() => setAddNotebookModalOpen(true)}
                className="text-lg absolute right-1 border-none border-transparent focus:border-transparent focus:ring-0"
              >
                <IoAdd />
              </button>
            }
          />
        </div>
        {/* 목록 열면 Notebook List 출력 */}
        <div className="my-2 ">
          {isNotebooksListOpen
            ? savedNotebooksList.map((data, idx) => (
                <SidebarNotebookList
                  key={idx}
                  data={data}
                  onClickNotebook={handleNotebookCoverButton}
                  onClickDeleteButton={handleDeleteButton}
                />
              ))
            : null}
        </div>
      </section>
    </aside>
  );
}
export default Sidebar;
