import { atom } from 'recoil';
import { NotebooksType, NotesType } from '../types';
import { recoilPersist } from 'recoil-persist';

// 새로고침 시 전역 상태 유지를 위함(로컬스토리지에 저장)
const { persistAtom } = recoilPersist();

/** Notebook 생성 모달 상태 (true: 모달 open / false: 모달 close) */
export const createNotebookModalState = atom<boolean>({
  key: 'createNotebookModalState',
  default: false,
});

/** Notebooks 목록 View Mode 상태 ('row' / 'col') */
export const notebooksViewModeState = atom({
  key: 'notebooksViewModeState',
  default: 'row',
});

/** Notebooks 목록 상태 (true: 목록 open / false: 목록 close) */
export const notebooksListOpenState = atom({
  key: 'notebooksListOpenState',
  default: true,
});

/** 선택한 Notebook의 정보 */
export const selectedNotebookState = atom<NotebooksType[]>({
  key: 'selectedNotebookState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/** 선택한 Note의 정보 */
export const selectedNoteState = atom<NotesType[]>({
  key: 'selectedNoteState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
