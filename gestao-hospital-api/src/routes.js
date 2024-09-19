const express = require('express');
const { read, write } = require('./util/fileUtils');
const router = express.Router();
const crypto = require('crypto');

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

router.get('/api/users', (req, res) => {
    read('users.txt', (data) => {
        const users = data.trim().split('\n').map(line => {
            const [id, nome, papel, email] = line.split(';');
            return { id, nome, papel, email };
        });
        res.json(users);
    });
});

router.post('/api/users', (req, res) => {
    const {nome, papel, email} = req.body;
    const id = generateId();
    const content = `${id};${nome};${papel};${email}\n`;
    write('users.txt', content);
    res.json({ id, nome, papel, email });
});

module.exports = router;