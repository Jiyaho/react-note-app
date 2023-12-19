import { useRecoilState } from 'recoil';
import { notebooksViewModeState } from '../../../recoil/atoms';
import { LuPencil } from 'react-icons/lu';

interface Prop {
  data: any;
  onClick: React.MouseEventHandler;
}

function NotebookCoverButton({ data, onClick }: Prop) {
  const [viewMode] = useRecoilState(notebooksViewModeState);

  return (
    <>
      {viewMode === 'row' ? (
        // viewMode가 row일 때: flex-row 방향으로 출력
        <div id={data.id} className="py-3 relative group" onClick={onClick}>
          <button
            className={`w-[88px] h-28 rounded-lg relative`}
            style={{ backgroundColor: `${data.coverColor}` }}
          >
            <div className="flex items-center justify-start absolute bottom-0 rounded-b-md bg-black bg-opacity-30 w-full h-7">
              <span className="text-white text-xs m-2">{data.name}</span>
            </div>
            <div className="absolute top-1 right-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-7 h-7 rounded-full bg-black bg-opacity-30 flex items-center justify-center">
              <LuPencil className="text-white text-sm  " />
            </div>
          </button>
        </div>
      ) : (
        // viewMode가 col일 때: flex-column 방향으로 출력
        <div
          id={data.id}
          className="group flex gap-1 w-screen pt-2 pb-1 px-7 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={onClick}
        >
          <button
            className={`w-5 h-7 rounded relative`}
            style={{ backgroundColor: `${data.coverColor}` }}
          ></button>
          <div className="flex items-center justify-start">
            <span className="text-gray-600 text-xs m-2">{data.name}</span>
            <div className="flex items-center absolute right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-7 h-7 ">
              <LuPencil className="text-gray-600 text-sm  " />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default NotebookCoverButton;
