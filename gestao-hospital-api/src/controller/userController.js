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
    const { nome, papel, email } = req.body;
    const id = generateId();  
    const content = `${id};${nome};${papel};${email}\n`;
    write('users.txt', content);
    res.json({ id, nome, papel, email });
};

exports.getPacientes = (req, res) => {
    read('users.txt', (data) => {
        const users = parseUsers(data);
        const pacientes = users.filter(user => user.papel === 'paciente');
        res.json(pacientes);
    });
};

exports.getMedicos = (req, res) => {
    read('users.txt', (data) => {
        const users = parseUsers(data);
        const medicos = users.filter(user => user.papel === 'medico');
        res.json(medicos);
    });
};