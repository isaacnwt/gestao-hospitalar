import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from '../../services/apiService';
import BotaoVoltarComponent from '../../components/BotaoVoltarComponent';
import './AdminPage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nome: '',
    role: '',
    email: '',
    endereco: '',
    cep: '',
    numero: '',
  });

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

  const handleCEPChange = async (e) => {
    const cep = e.target.value;
    setNewUser({ ...newUser, cep });

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado');
        } else {
          setNewUser({
            ...newUser,
            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
            cep,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await addUser(newUser);
      setNewUser({ nome: '', role: '', email: '', endereco: '', cep: '', numero: '' });
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
        <div className="form-row">
          <input
            type="text"
            placeholder="CEP"
            value={newUser.cep}
            onChange={handleCEPChange}
            maxLength="8"
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={newUser.endereco}
            onChange={(e) => setNewUser({ ...newUser, endereco: e.target.value })}
            disabled
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Número"
            value={newUser.numero}
            onChange={(e) => setNewUser({ ...newUser, numero: e.target.value })}
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
            <th>Endereço</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.endereco}, {user.numero}</td>
              <td>{formatRole(user.role)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BotaoVoltarComponent />
    </div>
  );
}

export default AdminPage;
