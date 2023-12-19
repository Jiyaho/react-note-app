import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notebooks from './pages/Notebooks';
import WriteNote from './pages/WriteNote';
import EditNote from './pages/EditNote';
import SelectNotebook from './components/elements/Notebooks/SelectNotebook';

function App() {
  return (
    <div className="min-w-1400 max-w-1920">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/notebooks/:notebookId" element={<SelectNotebook />} />
          <Route path="/notebooks/:notebookId/write" element={<WriteNote />} />
          <Route path="/notebooks/:notebookId/write/:noteId" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
