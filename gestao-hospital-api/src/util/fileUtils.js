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

module.exports = { read, write };