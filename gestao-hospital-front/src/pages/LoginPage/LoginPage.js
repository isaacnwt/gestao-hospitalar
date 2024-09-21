import React, { useState } from 'react';
import { fetchUsers } from '../../services/apiService';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const users = await fetchUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        setError('Usuário não encontrado');
        return;
      }

      onLoginSuccess(user);
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setError('Erro ao autenticar. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
