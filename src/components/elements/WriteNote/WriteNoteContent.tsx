import { useEffect, useRef, useState } from 'react';
import { selectedNotebookState } from '../../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import getNotebooksData from '../../../utils/getNotebooksData';
import getDate from '../../../utils/getDate';

function WriteNoteContent() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const currentNotebook = useRecoilValue(selectedNotebookState)[0];
  const setNotebookState = useSetRecoilState(selectedNotebookState);

  const savedNotebooksList = getNotebooksData();
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleValue && contentValue) {
      // 노트 속성
      const noteObject = {
        id: JSON.stringify(Date.now()),
        createAt: getDate(),
        title: titleValue,
        content: contentValue,
      };

      // 현재 선택된 노트북를 제외한 나머지 노트북 리스트들
      const otherData = savedNotebooksList.filter((notebook) => {
        return notebook.id !== currentNotebook.id;
      });

      // 현재 선택된 노트북에 새로운 NoteList 추가
      const newNoteList = [...currentNotebook.noteList, noteObject];

      // 업데이트된 노트북 리스트
      const updatedNotebookList = [...otherData, { ...currentNotebook, noteList: newNoteList }];

      // 업데이트된 노트북 리스트를 로컬스토리지에 저장
      localStorage.setItem('notebooks', JSON.stringify(updatedNotebookList));

      // Recoil에 새로운 노트북 데이터 전달
      const newNotebook = [{ ...currentNotebook, noteList: newNoteList }];
      setNotebookState(newNotebook);
      window.alert('Created a new note successful !');
      window.location.reload();
    }
  };

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <section className="ml-[280px] p-6 fixed w-[62vw]">
      <form onSubmit={handleSubmit} className="flex flex-col outline-none">
        <input
          onChange={handleTitle}
          type="text"
          placeholder="Please enter a title."
          ref={titleInputRef}
          className="text-lg font-semibold mb-2 border-none border-transparent focus:border-transparent focus:ring-0"
          onBlur={(e) => (e.target.placeholder = 'Please enter a title.')}
        />
        <textarea
          onChange={handleContent}
          placeholder="Please enter your content."
          className=" h-[20vh] text-sm border-none border-transparent focus:border-transparent focus:ring-0"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'Please enter your content.')}
        />
        <button
          className="w-24 text-center p-2 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
          type="submit"
        >
          Create
        </button>
      </form>
    </section>
  );
}
export default WriteNoteContent;
