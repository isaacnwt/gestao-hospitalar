const { read, write, parseUsers, parseConsultas } = require('../util/utils');
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

exports.getConsultasByMedico = (req, res) => {
    const { idMedico } = req.params;

    read('consultas.txt', (data) => {
        const consultas = parseConsultas(data);
        const consultasMedico = consultas.filter(consulta => consulta.idMedico === idMedico);

        read('users.txt', (userData) => {
            const users = parseUsers(userData);

            const consultasDetalhadas = consultasMedico.map(consulta => {
                const paciente = users.find(user => user.id === consulta.idPaciente);
                return {
                    idConsulta: consulta.idConsulta,
                    paciente: paciente ? paciente.nome : 'Desconhecido',
                    dataConsulta: consulta.dataConsulta,
                    descricao: consulta.descricao
                };
            });

            res.json(consultasDetalhadas);
        });
    });
};

exports.getConsultasByPaciente = (req, res) => {
    const { idPaciente } = req.params;

    read('consultas.txt', (data) => {
        const consultas = parseConsultas(data);
        const consultasPaciente = consultas.filter(consulta => consulta.idPaciente === idPaciente);

        read('users.txt', (userData) => {
            const users = parseUsers(userData);

            const consultasDetalhadas = consultasPaciente.map(consulta => {
                const medico = users.find(user => user.id === consulta.idMedico);
                return {
                    idConsulta: consulta.idConsulta,
                    medico: medico ? medico.nome : 'Desconhecido',
                    dataConsulta: consulta.dataConsulta,
                    descricao: consulta.descricao
                };
            });

            res.json(consultasDetalhadas);
        });
    });
};

exports.getConsultas = (req, res) => {
    read('consultas.txt', (data) => {
        const consultas = parseConsultas(data);
        res.json(consultas);
    });
};