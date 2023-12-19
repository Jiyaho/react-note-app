import { useRecoilValue } from 'recoil';
import Layout from '../../layouts/Layout';
import { selectedNotebookState } from '../../../recoil/atoms';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SelectNotebook() {
  const currentNotebook = useRecoilValue(selectedNotebookState)[0];
  const noteList = currentNotebook?.noteList;
  const notebookCoverColor = currentNotebook?.coverColor;
  const navigate = useNavigate();
  const { notebookId } = useParams();

  useEffect(() => {
    // 해당 노트북 삭제되어 데이터 없는 경우 메인 페이지로 리다이렉트
    if (!notebookCoverColor) {
      navigate('/');
    }
    // 작성된 노트가 있으면 이동

    if (noteList.length) {
      navigate(`/notebooks/${notebookId}/write`);
    }
  }, [notebookCoverColor, noteList, navigate, notebookId]);

  return (
    <Layout>
      {/* 작성된 노트가 없으면 새로운 노트 생성 화면 출력 */}
      {noteList.length === 0 && (
        <div className="h-[50vh] flex flex-col gap-4 items-center">
          <div
            className={`w-[90px] h-[120px] rounded-lg m-auto mb-2`}
            style={{ backgroundColor: `${notebookCoverColor}` }}
          ></div>
          <p className="text-gray-500 text-xs text-center">
            Have a thought to jot down? Tap on the button below.
          </p>
          <Link
            to={`/notebooks/${notebookId}/write`}
            className="text-sky-600 text-sm flex justify-center"
          >
            New Note
          </Link>
        </div>
      )}
    </Layout>
  );
}
export default SelectNotebook;
