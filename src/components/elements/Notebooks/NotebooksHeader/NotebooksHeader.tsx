import { NotebooksType } from '../../../../types';
import OpenCreateNotebookModal from '../../../features/modals/CreateNotebook/OpenCreateNotebookModal';
import { IoAdd } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { createNotebookModalState } from '../../../../recoil/atoms';
import NotebookSearchInput from './fragments/NotebookSearchInput';
import { useState } from 'react';
import NotebooksToggleViewButton from './fragments/NotebooksToggleViewButton';

interface Prop {
  data: NotebooksType[];
  onFilter: (inputValue: string) => void;
}

function NotebooksHeader({ data, onFilter }: Prop) {
  const [, setInputValue] = useState('');
  const [, setIsModalOpen] = useRecoilState(createNotebookModalState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onFilter(e.target.value); // 상위 컴포넌트로 필터링된 노트북 목록 전달
  };

  return (
    <header className="mt-[-40px] h-10 flex justify-between bg-gray-50 border-gray-200  border-b-[1px] px-7">
      <h1 className="flex items-center text-gray-600">Notebooks ({data.length})</h1>
      <div className="flex gap-6">
        <NotebooksToggleViewButton />
        <NotebookSearchInput onChange={handleInputChange} />
        <OpenCreateNotebookModal
          children={
            <button onClick={() => setIsModalOpen(true)} className="text-lg hover:text-sky-600">
              <IoAdd className="text-xl" />
            </button>
          }
        />
      </div>
    </header>
  );
}
export default NotebooksHeader;
