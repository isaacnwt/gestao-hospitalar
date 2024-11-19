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
        const [id, nome, role, email, cep, rua, bairro, cidade, estado, numero] = line.replace('\r', '').split(';');
        return { id, nome, role, email, cep, rua, bairro, cidade, estado, numero };
    });
}

function parseConsultas(data) {
    return data.trim().split('\n').map(line => {
        const [idConsulta, idMedico, idPaciente, dataConsulta, descricao] = line.replace('\r', '').split(';');
        return { idConsulta, idMedico, idPaciente, dataConsulta, descricao };
    });
}

module.exports = { read, write, parseUsers, parseConsultas };