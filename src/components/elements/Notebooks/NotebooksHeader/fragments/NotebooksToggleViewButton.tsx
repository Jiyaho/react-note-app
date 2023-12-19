import { FiGrid } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { notebooksViewModeState } from '../../../../../recoil/atoms';

function NotebooksToggleViewButton() {
  const [viewMode, setViewMode] = useRecoilState(notebooksViewModeState);

  const handleToggleViewMode = () => {
    setViewMode((mode) => (mode === 'row' ? 'col' : 'row'));
  };

  return (
    <div className="flex border-[1px] border-gray-200 rounded-md overflow-hidden w-20 h-[85%] m-auto cursor-pointer">
      <button
        className={`flex justify-center items-center ${
          viewMode === 'row' ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'
        } w-full`}
        onClick={handleToggleViewMode}
      >
        <FiGrid />
      </button>
      <button
        className={`flex justify-center items-center ${
          viewMode === 'col' ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'
        } w-full`}
        onClick={handleToggleViewMode}
      >
        <AiOutlineMenu />
      </button>
    </div>
  );
}
export default NotebooksToggleViewButton;
