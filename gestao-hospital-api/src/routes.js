const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('./controller/userController');
const { createConsulta, getConsultasByMedico, getConsultasByPaciente, getConsultas } = require('./controller/consultaController');

router.get('/users', getUsers);
router.post('/users', createUser);

router.post('/consultas', createConsulta);
router.get('/consultas', getConsultas);
router.get('/medicos/:idMedico/consultas', getConsultasByMedico);
router.get('/pacientes/:idPaciente/consultas', getConsultasByPaciente);

module.exports = router;