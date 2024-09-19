const { read, write } = require('../util/fileUtils');
const { parseUsers } = require('../util/userUtils');
const crypto = require('crypto');

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

function validateRole(role, expectedRole) {
    if (role !== expectedRole) {
        throw new Error(`O usuário deve ser um ${expectedRole}. Usuário enviado: ${role}`);
    }
}

exports.createConsulta = (req, res) => {
    const { idMedico, idPaciente, dataConsulta, descricao } = req.body;

    read('users.txt', (data) => {
        const users = parseUsers(data);

        const medico = users.find(user => user.id === idMedico);
        const paciente = users.find(user => user.id === idPaciente);

        if (!medico || !paciente) {
            return res.status(400).json({ message: 'Médico ou Paciente não encontrados' });
        }

        try {
            validateRole(medico.papel, 'medico');
            validateRole(paciente.papel, 'paciente');
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        idConsulta = generateId()
        const content = `${idConsulta};${idMedico};${idPaciente};${dataConsulta};${descricao}\n`;
        write('consultas.txt', content);
        res.json({ idConsulta, idMedico, idPaciente, dataConsulta, descricao });
    });
};