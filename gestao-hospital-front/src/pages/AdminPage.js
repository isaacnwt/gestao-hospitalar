import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from '../services/apiService';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);

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
      setNewUser({ nome: '', papel:'', email: ''});
      const userList = await fetchUsers();
      setUsers(userList)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  return (
    <div>
      <h1>Painel do Administrador</h1>
      
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Nome"
          value={newUser.nome}
          onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tipo de Usuário"
          value={newUser.papel}
          onChange={(e) => setNewUser({ ...newUser, papel: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <button type="submit">Adicionar Usuário</button>
      </form>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Nome: {user.nome}, Função: {user.papel}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
