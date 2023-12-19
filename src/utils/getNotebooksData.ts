import { NotebooksType } from '../types';

function getNotebooksData() {
  const getNotebooksJSON = localStorage.getItem('notebooks');
  const parseData: NotebooksType[] = getNotebooksJSON ? JSON.parse(getNotebooksJSON) : [];
  return parseData;
}
export default getNotebooksData;
