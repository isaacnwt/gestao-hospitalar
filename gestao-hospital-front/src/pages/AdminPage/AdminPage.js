import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from '../../services/apiService';
import './AdminPage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nome: '', role: '', email: '' });

  useEffect(() => {
    async function loadUsers() {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    loadUsers();
  }, []);

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await addUser(newUser);
      setNewUser({ nome: '', role: '', email: '' });
      const userList = await fetchUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const formatRole = (role) => {
    switch (role) {
      case 'medico':
        return 'Médico';
      case 'admin':
        return 'Administrador';
      case 'paciente':
        return 'Paciente';
      default:
        return role;
    }
  };

  return (
    <div className="container">
      <h1>Painel do Administrador</h1>

      <form onSubmit={handleAddUser}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Nome"
            value={newUser.nome}
            onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        >
          <option value="">--</option>
          <option value="medico">Médico</option>
          <option value="admin">Administrador</option>
          <option value="paciente">Paciente</option>
        </select>
        <button type="submit">Adicionar Usuário</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{formatRole(user.role)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
