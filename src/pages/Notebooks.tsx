import NotebooksHeader from '../components/elements/Notebooks/NotebooksHeader/NotebooksHeader';
import Layout from '../components/layouts/Layout';
import { NotebooksType } from '../types';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { notebooksViewModeState, selectedNotebookState } from '../recoil/atoms';
import NotebookCoverButton from '../components/elements/Notebooks/NotebookCoverButton';
import getNotebooksData from '../utils/getNotebooksData';
import { useNavigate } from 'react-router-dom';

function Notebooks() {
  const [viewMode] = useRecoilState(notebooksViewModeState);
  const savedNotebooksList = getNotebooksData();
  const [filteredNotebookList, setFilteredNotebookList] =
    useState<NotebooksType[]>(savedNotebooksList);
  const navigate = useNavigate();
  const setNotebookState = useSetRecoilState(selectedNotebookState);

  const handleFilterNotebooks = (inputValue: string) => {
    // 'i' 플래그를 통해 대소문자를 무시하고 검색 결과에 반영
    const regex = new RegExp(inputValue, 'i');
    const filteredNotebooks = savedNotebooksList.filter((notebook) => regex.test(notebook.name));
    setFilteredNotebookList(filteredNotebooks);
  };

  // 선택한 노트북에 대한 페이지로 이동
  const handleNotebookCoverButton = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedNotebookId = e.currentTarget.id;
    const currentNotebookData = savedNotebooksList.filter(
      (notebook) => notebook.id === selectedNotebookId,
    );
    setNotebookState(currentNotebookData);
    navigate(`/notebooks/${selectedNotebookId}`);
  };

  useEffect(() => {
    if (savedNotebooksList.length === 0) {
      navigate(`/`);
    }
  }, [navigate, savedNotebooksList]);

  return (
    <Layout>
      <NotebooksHeader data={filteredNotebookList} onFilter={handleFilterNotebooks} />
      <section className={`flex ${viewMode === 'row' ? 'flex-row mx-7 gap-8' : 'flex-col'} `}>
        {filteredNotebookList.map((data, index) => (
          <NotebookCoverButton key={index} data={data} onClick={handleNotebookCoverButton} />
        ))}
      </section>
    </Layout>
  );
}
export default Notebooks;
