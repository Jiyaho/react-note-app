import { useEffect, useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { NotebooksType } from '../../../../types';

interface Prop {
  data: NotebooksType;
  onClickNotebook: React.MouseEventHandler;
  onClickDeleteButton: React.MouseEventHandler;
}
function SidebarNotebookList({ data, onClickNotebook, onClickDeleteButton }: Prop) {
  const [isMoreButtonClick, setIsMoreButtonClick] = useState(false);
  const [moreOptionsPosition, setMoreOptionsPosition] = useState({ top: 0, left: 0 });
  const moreOptionsRef = useRef<HTMLDivElement>(null);

  const handleMoreButton = (e: React.MouseEvent<HTMLDivElement>) => {
    // 버튼의 위치를 계산하여 상태에 저장
    setMoreOptionsPosition({ top: e.clientY, left: e.clientX });
    setIsMoreButtonClick(true);
  };

  useEffect(() => {
    // MoreOptions 버튼 외부 클릭 시 창 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(e.target as Node)) {
        setIsMoreButtonClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [moreOptionsRef]);

  return (
    <div className="group flex gap-2 w-full px-6 py-2 cursor-pointer hover:bg-gray-100">
      <div
        id={data.id}
        className="w-full flex gap-2 items-center justify-start"
        onClick={onClickNotebook}
      >
        <button
          className={`w-5 h-7 rounded relative`}
          style={{ backgroundColor: `${data.coverColor}` }}
        ></button>
        <button className="text-xs text-gray-600">
          {data.name}
          <span className="text-xs ml-1 text-gray-400">
            {`${data.noteList.length ? data.noteList.length : ''}`}
          </span>
        </button>
      </div>
      <div
        onClick={handleMoreButton}
        className="flex items-center absolute right-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-7 h-7 "
      >
        <IoIosMore className="text-gray-400 text-xl" />
      </div>
      {isMoreButtonClick && (
        <div
          ref={moreOptionsRef}
          className="absolute p-2 w-32 rounded-md text-xs bg-gray-600 text-white flex flex-col gap-1"
          style={{
            top: moreOptionsPosition.top - 43,
            left: moreOptionsPosition.left,
          }}
        >
          <button
            id={data.id}
            onClick={onClickDeleteButton}
            className="hover:bg-blue-400 cursor-pointer p-1 text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default SidebarNotebookList;
