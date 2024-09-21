import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage/AdminPage'
import MedicoPage from './pages/MedicoPage'
import PacientePage from './pages/PacientePage'
import ConsultaPage from './pages/ConsultaPage/ConsultaPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' Component={AdminPage} />
        <Route path='/admin/consulta' Component={ConsultaPage} />
        <Route path='/medico' Component={MedicoPage} />
        <Route path='/paciente' Component={PacientePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
