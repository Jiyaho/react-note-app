# React Note App (React 메모 애플리케이션)

- 'UpNote' 메모 애플리케이션 UI와 비슷하게 구현
- LocalStorage를 이용한 데이터 저장
- Notebook 생성 / 삭제
- Note 생성 / 수정 / 삭제

<br />

## ⛓️ URL

- Web Site: https://react-note-app-beta.vercel.app/

- Github Repository: https://github.com/Jiyaho/react-note-app

<br />

## 🛠️ Used skills

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white" />

</div>

<br />

## 🖥️ Introducing Features

### 1. Create New Notebook

  <img src="https://i.ibb.co/zs4gpNr/01-create-notebook.gif" alt="01-create-notebook" width="700px" />

### 2. Create New Note

  <img src="https://i.ibb.co/BBH0NkK/02-create-note.gif" alt="02-create-note" width="700px" />

### 3. Edit Notes

  <img src="https://i.ibb.co/0yb6FM7/03-edit-note.gif" alt="03-edit-note" width="700px" />

### 4. Delete Notes

  <img src="https://i.ibb.co/c38rkRV/04-delete-note.gif" alt="04-delete-note" width="700px" />

### 5. Delete Notebooks

  <img src="https://i.ibb.co/jV4K4Z5/05-delete-notebook.gif" alt="05-delete-notebook" width="700px" />

### 6. View Notebook List / Search for Notebooks

  <img src="https://i.ibb.co/yFmW6HY/06-view-notebooks.gif" alt="06-view-notebooks" width="700px" />

<br />

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

### 1. Home(Main) Page

- path: `/`
- Create New Notebook: 새 노트북 생성을 위한 Modal (React-modal Library 사용)
- 기존에 생성한 노트북있는 경우 Notebook List Page(`/notebooks`)로 Redirect

### 3. Notebooks Page

- path: `/notebooks`
- LocalStorage에 저장된 Notebook 목록 출력
- Sub-header: 노트북 개수 출력, 노트북 목록 View Mode 설정, 노트북 검색 Input, 새로운 노트북 추가 버튼

### 4. Notebook Page

- path: `/notebooks/:notebookId`
- 선택한 노트북 페이지
- 노트북에 생성한 노트가 없는 경우: New Note 생성 안내 컴포넌트 출력
- 노트북에 생성한 노트가 있는 경우: Write Note Page(`/notebooks/:notebookId/write`)로 Redirect

### 5. Write Note Page

- path: `/notebooks/:notebookId/write`
- Sub-sidebar: 노트 목록 출력
  - Sub-sidebar의 Header: 노트북 이름 출력, 노트북 삭제 버튼
- WriteNote 컴포넌트: 새로운 노트 작성 컴포넌트
  - WriteNote의 Header: 노트 삭제 버튼

### 6. Edit Note Page

- path: `/notebooks/:notebookId/write/:noteId`
- 선택한 노트 수정 페이지

<br />

## 🖼️ Layout

### 1. Sidebar

- 새로운 노트북 생성 버튼(`+`)
- 노트북 목록 열기/닫기(`⋁`,`>`)
- 노트북 목록에서 노트북 삭제 버튼(`・・・`)

### 2. Header

- 뒤로 가기 / 앞으로 가기 버튼
- 새로운 노트 생성 버튼

<br />

## 📁 Folder Structure (Project Tree)

```
📦 react-note-app
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
├─ src
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ components
│  │  ├─ elements
│  │  │  ├─ EditNote
│  │  │  │  ├─ EditNoteContent.tsx
│  │  │  │  └─ EditNoteLayout.tsx
│  │  │  ├─ Home
│  │  │  │  └─ EmptyNotebooks.tsx
│  │  │  ├─ Notebooks
│  │  │  │  ├─ NotebookCoverButton.tsx
│  │  │  │  ├─ NotebooksHeader
│  │  │  │  │  ├─ NotebooksHeader.tsx
│  │  │  │  │  └─ fragments
│  │  │  │  │     ├─ NotebookSearchInput.tsx
│  │  │  │  │     └─ NotebooksToggleViewButton.tsx
│  │  │  │  └─ SelectNotebook.tsx
│  │  │  └─ WriteNote
│  │  │     ├─ NoteListHeader.tsx
│  │  │     ├─ NoteListSidebar.tsx
│  │  │     ├─ WriteNoteContent.tsx
│  │  │     ├─ WriteNoteHeader.tsx
│  │  │     └─ WriteNoteLayout.tsx
│  │  ├─ features
│  │  │  └─ modals
│  │  │     └─ CreateNotebook
│  │  │        ├─ CreateNotebookForm.tsx
│  │  │        ├─ CreateNotebookModal.tsx
│  │  │        └─ OpenCreateNotebookModal.tsx
│  │  └─ layouts
│  │     ├─ Header.tsx
│  │     ├─ Layout.tsx
│  │     └─ Sidebar
│  │        ├─ Sidebar.tsx
│  │        └─ fragments
│  │           ├─ ArrowRotate.tsx
│  │           └─ SidebarNotebookList.tsx
│  ├─ constants
│  │  └─ notebookCoverColors.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ logo.svg
│  ├─ pages
│  │  ├─ EditNote.tsx
│  │  ├─ Home.tsx
│  │  ├─ Notebooks.tsx
│  │  └─ WriteNote.tsx
│  ├─ react-app-env.d.ts
│  ├─ recoil
│  │  └─ atoms.ts
│  ├─ reportWebVitals.ts
│  ├─ setupTests.ts
│  ├─ types
│  │  └─ index.ts
│  └─ utils
│     ├─ getDate.ts
│     ├─ getNotebooksData.ts
│     └─ handleDeleteNotebookButton.ts
├─ tailwind.config.js
└─ tsconfig.json
```
