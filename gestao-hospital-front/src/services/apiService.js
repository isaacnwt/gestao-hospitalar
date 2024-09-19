const API_URL = 'http://localhost:8080/api';

export async function fetchUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        
    }
}

export async function addUser(user) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        return await response.json();
    } catch (error) {
        
    }
}