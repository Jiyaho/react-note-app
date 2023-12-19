import EmptyNotebooks from '../components/elements/Home/EmptyNotebooks';
import Layout from '../components/layouts/Layout';
import { createNotebookModalState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import OpenCreateNotebookModal from '../components/features/modals/CreateNotebook/OpenCreateNotebookModal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import getNotebooksData from '../utils/getNotebooksData';

function Home() {
  const setModalState = useSetRecoilState(createNotebookModalState);
  const notebooksList = getNotebooksData();
  const navigate = useNavigate();

  const handleClickCreateNewNotebook = () => setModalState(true);

  useEffect(() => {
    // 기존에 생성한 notebook 있으면 `/notebooks`로 리다이렉트
    if (notebooksList.length) {
      navigate(`/notebooks`);
    }
  }, [navigate, notebooksList]);

  return (
    <Layout>
      {notebooksList.length === 0 && (
        // Display the modal
        <OpenCreateNotebookModal
          children={<EmptyNotebooks onClick={handleClickCreateNewNotebook} />}
        />
      )}
    </Layout>
  );
}
export default Home;
