import getNotebooksData from './getNotebooksData';

function handleDeleteButton(e: React.MouseEvent<HTMLButtonElement>) {
  const savedNotebooksList = getNotebooksData();
  // 노트북 삭제
  const selectedNotebookId = e.currentTarget.id; // 삭제할 노트북 id
  // 변경될 리스트: 삭제할 노트북 id와 같지 않은 노트북 리스트들 필터링
  const updatedNotebookList = savedNotebooksList.filter(
    (notebook) => notebook.id !== selectedNotebookId,
  );

  // 삭제 확인 팝업창
  if (window.confirm('Are you sure you want to delete this notebook?')) {
    // 삭제 확인 버튼 누른 경우 아래 로직 실행
    // localStorage에 변경된 노트북 리스트로 저장
    localStorage.setItem('notebooks', JSON.stringify(updatedNotebookList));

    window.location.reload();
  } else {
    // 삭제 취소 버튼 눌렀을 때, 부모 요소 화면에서 안 보이도록 변경
    const parentElement = e.currentTarget.parentElement;

    if (parentElement) {
      parentElement.style.display = 'none';
    }
  }
}
export default handleDeleteButton;
