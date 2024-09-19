const { read, write } = require('../util/fileUtils');
const crypto = require('crypto');

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

function formatPapel(papel) {
    switch (papel) {
        case 'medico':
            return 'Médico';
        case 'admin':
            return 'Administrador';
        case 'paciente':
            return 'Paciente';
        default:
            return papel;
    }
}

exports.getUsers = (req, res) => {
    read('users.txt', (data) => {
        const users = data.trim().split('\n').map(line => {
            const [id, nome, papel, email] = line.split(';');
            return { id, nome, papel: formatPapel(papel), email };
        });
        res.json(users);
    });
};

exports.createUser = (req, res) => {
    const { nome, papel, email } = req.body;
    const id = generateId();  
    const content = `${id};${nome};${papel};${email}\n`;
    write('users.txt', content);
    res.json({ id, nome, papel: formatPapel(papel), email });
};
