const fileSystem = require('fs'); 

function read(fileName, callback) {
    fileSystem.readFile(fileName, 'utf-8', (err, data) => {
        if (err) throw err;
        callback(data);
    });
}

function write(fileName, content) {
    fileSystem.appendFile(fileName, content, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('Arquivo atualizado com sucesso!');
    });
}

function parseUsers(data) {
    return data.trim().split('\n').map(line => {
        const [id, nome, papel, email] = line.split(';');
        return { id, nome, papel, email };
    });
}

function parseConsultas(data) {
    return data.trim().split('\n').map(line => {
        const [idConsulta, idMedico, idPaciente, dataConsulta, descricao] = line.split(';');
        return { idConsulta, idMedico, idPaciente, dataConsulta, descricao };
    });
}

module.exports = { read, write, parseUsers, parseConsultas };