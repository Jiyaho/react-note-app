import { useRecoilState } from 'recoil';
import { createNotebookModalState } from '../../../../recoil/atoms';
import CreateNotebookModal from './CreateNotebookModal';

interface Prop {
  children: React.ReactNode;
}

function OpenCreateNotebookModal({ children }: Prop) {
  const [isModalOpen, setModalIsOpen] = useRecoilState(createNotebookModalState);
  const closeModal = () => setModalIsOpen(false);
  return (
    <>
      {children}
      <CreateNotebookModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
}
export default OpenCreateNotebookModal;
