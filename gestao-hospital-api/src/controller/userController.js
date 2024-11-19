const { read, write, parseUsers } = require('../util/utils');
const crypto = require('crypto');

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

exports.getUsers = (req, res) => {
    read('users.txt', (data) => {
        const users = parseUsers(data);
        res.json(users);
    });
};

exports.createUser = (req, res) => {
    const { nome, role, email, cep, rua, bairro, cidade, estado, numero } = req.body;
    const id = generateId();

    if (!nome || !email || !role || !cep || !rua || !bairro || !cidade || !estado || !numero) {
        return res.status(400).json({ error: 'Faltando campo obrigatório.' });
    }

    const content = `${id};${nome};${role};${email};${cep};${rua};${bairro};${cidade};${estado};${numero}\n`;
    write('users.txt', content);
    res.json({ id, nome, role, email, cep, rua, bairro, cidade, estado, numero });
};

exports.getPacientes = (req, res) => {
    read('users.txt', (data) => {
        const users = parseUsers(data);
        const pacientes = users.filter(user => user.role === 'paciente');
        res.json(pacientes);
    });
};

exports.getMedicos = (req, res) => {
    read('users.txt', (data) => {
        const users = parseUsers(data);
        const medicos = users.filter(user => user.role === 'medico');
        res.json(medicos);
    });
};