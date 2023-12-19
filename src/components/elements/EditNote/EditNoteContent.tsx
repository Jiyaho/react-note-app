import { useEffect, useRef, useState } from 'react';
import { selectedNoteState, selectedNotebookState } from '../../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import getNotebooksData from '../../../utils/getNotebooksData';
import { useNavigate } from 'react-router-dom';
import getDate from '../../../utils/getDate';

function EditNoteContent() {
  const currentNotebook = useRecoilValue(selectedNotebookState)[0];
  const currentNoteData = useRecoilValue(selectedNoteState)[0];
  const [titleValue, setTitleValue] = useState(currentNoteData.title);
  const [contentValue, setContentValue] = useState(currentNoteData.content);
  const setNotebookState = useSetRecoilState(selectedNotebookState);
  const savedNotebooksList = getNotebooksData();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentId = e.currentTarget.id;
    if (titleValue && contentValue) {
      // 변경된 NoteList
      const updatedNoteList = currentNotebook.noteList.map((note) =>
        note.id === currentId
          ? { ...note, title: titleValue, content: contentValue, createAt: getDate() }
          : note,
      );

      // 현재 선택된 노트북를 제외한 나머지 노트북 리스트들
      const otherData = savedNotebooksList.filter((notebook) => {
        return notebook.id !== currentNotebook.id;
      });

      // 현재 선택된 노트북에 변경된 NoteList 추가
      const newNotebook = { ...currentNotebook, noteList: updatedNoteList };

      // 기존 노트북 리스트 + 변경된 현재 노트북 데이터 배열에 함께 저장
      const updatedNotebookList = [...otherData, newNotebook];

      // 업데이트된 노트북 리스트를 로컬스토리지에 저장
      localStorage.setItem('notebooks', JSON.stringify(updatedNotebookList));

      setNotebookState([newNotebook]); // 변경된 노트북 상태 전달
      window.alert('The update was successful !');
      navigate(`/notebooks/${currentNotebook.id}/write`);
    }
  };

  useEffect(() => {
    // input auto focus
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
    // 선택한 노트 상태 변경될 떄마다 input value 업데이트
    setTitleValue(currentNoteData.title);
    setContentValue(currentNoteData.content);
  }, [currentNoteData]);

  return (
    <section className="ml-[280px] p-6 fixed w-[62vw]">
      <form id={currentNoteData.id} onSubmit={handleSubmit} className="flex flex-col outline-none">
        <input
          onChange={handleTitle}
          value={titleValue}
          type="text"
          placeholder="Please enter a title."
          ref={titleInputRef}
          className="text-lg font-semibold mb-2 border-none border-transparent focus:border-transparent focus:ring-0"
          onBlur={(e) => (e.target.placeholder = 'Please enter a title.')}
        />
        <textarea
          onChange={handleContent}
          value={contentValue}
          placeholder="Please enter your content."
          className=" h-[20vh] text-sm border-none border-transparent focus:border-transparent focus:ring-0"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'Please enter your content.')}
        />
        <button
          className="mt-9 w-24 text-center p-2 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
          type="submit"
        >
          Update
        </button>
      </form>
    </section>
  );
}
export default EditNoteContent;
