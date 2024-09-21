const API_URL = 'http://localhost:8080';

export async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) 
        throw new Error('Erro ao buscar usuários');
    return await response.json();
}

export async function addUser(user) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!response.ok)
        throw new Error('Erro ao buscar usuários');
    return await response.json();
}

export async function fetchMedicos() {
    const response = await fetch(`${API_URL}/users/medicos`);
    if (!response.ok)
        throw new Error('Erro ao buscar médicos');
    return await response.json();
}

export async function fetchPacientes() {
    const response = await fetch(`${API_URL}/users/pacientes`);
    if (!response.ok)
        throw new Error('Erro ao buscar pacientes');
    return await response.json();
}

export async function addConsulta(consulta) {
    const response = await fetch(`${API_URL}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consulta)
    });
    if (!response.ok) 
        throw new Error('Erro ao cadastrar consulta');
    return await response.json();
}

export async function fetchConsultasByMedico(idMedico) {
    const response = await fetch(`${API_URL}/medicos/${idMedico}/consultas`);
    if (!response.ok)
      throw new Error('Erro ao buscar consultas');
    return await response.json();
  }
  
  export async function fetchConsultasByPaciente(idPaciente) {
    const response = await fetch(`${API_URL}/pacientes/${idPaciente}/consultas`);
    if (!response.ok)
      throw new Error('Erro ao buscar consultas');
    return await response.json();
  }