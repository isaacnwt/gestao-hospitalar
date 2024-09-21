import React, { useState } from 'react';
import LoginPage from './LoginPage/LoginPage';
import AdminPage from './AdminPage/AdminPage';
import ConsultaPage from './ConsultaPage/ConsultaPage';
import MedicoPage from './MedicoPage/MedicoPage';
import PacientePage from './PacientePage/PacientePage';

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);

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
        <AdminPage />
        <ConsultaPage />
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
