const express = require('express');
const { read, write } = require('./util/fileUtils');

const router = express.Router();

router.get('/api/users', (req, res) => {
    read('users.txt');
    res.send('Leitura de usuários concluída. Verifique o console.');
});

router.post('/api/users', (req, res) => {
    const {nome, papel, email} = req.body;
    const content = `${nome};${papel};${email}\n`;
    write('users.txt', content);
    res.send('Usuário adicionado com sucesso!');
});

module.exports = router;