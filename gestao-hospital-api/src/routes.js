const express = require('express');
const { read, write } = require('./util/fileUtils');

const router = express.Router();

router.get('/api/users', (req, res) => {
    read('users.txt', (data) => {
        const users = data.trim().split('\n').map(line => {
            const [nome, papel, email] = line.split(';');
            return { nome, papel, email };
        });
        res.json(users);
    });
});

router.post('/api/users', (req, res) => {
    const {nome, papel, email} = req.body;
    const content = `${nome};${papel};${email}\n`;
    write('users.txt', content);
    res.send('Usuário adicionado com sucesso!');
});

module.exports = router;