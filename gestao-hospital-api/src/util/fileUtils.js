const fileSystem = require('fs'); 

function read(fileName) {
    fileSystem.readFile(fileName, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}

function write(fileName, content) {
    fileSystem.writeFile(fileName, content, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('Arquivo atualizado com sucesso!');
    });
}

module.exports = { read, write };