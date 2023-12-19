# React 메모 애플리케이션

- 'UpNote' 메모 애플리케이션 UI와 비슷하게 구현하기
- LocalStorage를 이용한 데이터 생성 및 저장 (Notebook 생성/삭제 & Note 생성/수정/삭제)

## 🛠️ 사용한 기술

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white" />
</div>

## 🗂️ 페이지 구성

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/notebooks" element={<Notebooks />} />
    <Route path="/notebooks/:notebookId" element={<SelectNotebook />} />
    <Route path="/notebooks/:notebookId/write" element={<WriteNote />} />
    <Route path="/notebooks/:notebookId/write/:noteId" element={<EditNote />} />
  </Routes>
</BrowserRouter>
```

### 1. Home(Main) Page: `/`

- Create New Notebook: 새 노트북 생성을 위한 Modal (React-modal Library 사용)
- 기존에 생성한 노트북있는 경우 Notebook List Page(`/notebooks`)로 Redirect

### 3. Notebooks Page: `/notebooks`

- LocalStorage에 저장된 Notebook 목록 출력
- Sub-header: 노트북 개수 출력, 노트북 목록 View Mode 설정, 노트북 검색 Input, 새로운 노트북 추가 버튼

### 4. Notebook Page: `/notebooks/:notebookId`

- 선택한 노트북 페이지
- 노트북에 생성한 노트가 없는 경우: New Note 생성 안내 컴포넌트 출력
- 노트북에 생성한 노트가 있는 경우: Write Note Page(`/notebooks/:notebookId/write`)로 Redirect

### 5. Write Note Page: `/notebooks/:notebookId/write`

- Sub-sidebar: 노트 목록 출력
  - Sub-sidebar의 Header: 노트북 이름 출력, 노트북 삭제 버튼
- WriteNote 컴포넌트: 새로운 노트 작성 컴포넌트
  - WriteNote의 Header: 노트 삭제 버튼

### 6. Edit Note Page: `/notebooks/:notebookId/write/:noteId`

- 선택한 노트 수정 페이지

## 🖼️ Main Layout / 기타 기능

### 1. Sidebar

- 새로운 노트북 생성 버튼(`+`)
- 노트북 목록 열기/닫기(`⋁`,`>`)
- 노트북 목록에서 노트북 삭제 버튼(`・・・`)

### 2. Header

- 뒤로 가기 / 앞으로 가기 버튼
- 새로운 노트 생성 버튼

## 📁 Folder Structure
