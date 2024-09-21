import React, { useState } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import AdminPage from '../AdminPage/AdminPage';
import ConsultaPage from '../ConsultaPage/ConsultaPage';
import MedicoPage from '../MedicoPage/MedicoPage';
import PacientePage from '../PacientePage/PacientePage';
import './HomePage.css'

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [adminView, setAdminView] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  if (!loggedInUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (loggedInUser.role === 'admin') {
    return (
      <div>
        <h1>Bem-vindo, {loggedInUser.nome}</h1>
        <nav>
          <button onClick={() => setAdminView('adminPage')}>Painel do Administrador</button>
          <button onClick={() => setAdminView('consultaPage')}>Cadastrar Consulta</button>
        </nav>
        {adminView === 'adminPage' && <AdminPage />}
        {adminView === 'consultaPage' && <ConsultaPage />}
      </div>
    );
  }

  if (loggedInUser.role === 'medico') {
    return <MedicoPage userId={loggedInUser.id} />;
  }

  if (loggedInUser.role === 'paciente') {
    return <PacientePage userId={loggedInUser.id} />;
  }

  return <div>Role não reconhecido.</div>;
}

export default HomePage;
