import { useState } from 'react';
import { colors } from '../../../../constants/notebookCoverColors';
import { useSetRecoilState } from 'recoil';
import { createNotebookModalState, selectedNotebookState } from '../../../../recoil/atoms';
import { useNavigate } from 'react-router-dom';

function CreateNewNotebookForm() {
  const [notebookName, setNotebookName] = useState('');
  const [notebookCoverColor, setNotebookCoverColor] = useState('');
  const setIsModalOpen = useSetRecoilState(createNotebookModalState);
  const setSelectedNotebookState = useSetRecoilState(selectedNotebookState);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotebookName(e.target.value);
  };

  const handleColorChange = (color: string) => {
    setNotebookCoverColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // notebook name과 cover color 선택한 경우 아래 로직 실행
    if (notebookName && notebookCoverColor) {
      // notebook form
      const notebookData = {
        id: JSON.stringify(Date.now()),
        name: notebookName,
        coverColor: notebookCoverColor,
        noteList: [],
      };

      // 기존의 노트북 목록 가져오기
      const existingNotebooksJSON = localStorage.getItem('notebooks');
      const existingNotebooks = existingNotebooksJSON ? JSON.parse(existingNotebooksJSON) : [];

      // 새로운 노트북 추가
      const updatedNotebooks = [...existingNotebooks, notebookData];

      // Local Storage에 업데이트된 목록 저장
      localStorage.setItem('notebooks', JSON.stringify(updatedNotebooks));

      setSelectedNotebookState([notebookData]); // 상태 전달
      setIsModalOpen(false); // Modal을 닫음
      navigate(`/notebooks/${notebookData.id}`); //해당 노트북 페이지로 이동
    }
  };

  return (
    <>
      <h1 className="text-center text-xl mt-1">Create New Notebook</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 p-3 mt-4">
        <div className="flex gap-10 items-center">
          <label className="text-sm">Name</label>
          <input
            className="w-full text-gray-600 text-sm border-none bg-gray-100 border-transparent focus:border-transparent focus:ring-0"
            type="text"
            placeholder="Enter notebook name"
            value={notebookName}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex gap-10">
          <label className="text-sm">Cover</label>
          <div className="w-72 flex flex-wrap gap-7">
            {colors.map((color, index) => (
              <button
                type="button"
                key={index}
                className={`w-12 h-16 rounded-md relative`}
                style={{ backgroundColor: `${color}` }}
                onClick={() => handleColorChange(color)}
              >
                {notebookCoverColor === color && (
                  <div className="m-auto w-7 text-lg text-white rounded-full bg-gray-700 bg-opacity-50">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`rounded w-20 h-8 text-sm p-1 right-7 bottom-5 absolute ${
            notebookName && notebookCoverColor
              ? 'bg-sky-600 text-white'
              : 'border-[1px] border-gray-300 text-gray-300'
          }`}
        >
          Create
        </button>
      </form>
    </>
  );
}

export default CreateNewNotebookForm;
