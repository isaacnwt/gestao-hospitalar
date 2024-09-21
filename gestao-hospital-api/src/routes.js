const express = require('express');
const router = express.Router();
const { getUsers, createUser, getPacientes, getMedicos } = require('./controller/userController');
const { createConsulta, getConsultasByMedico, getConsultasByPaciente, getConsultas } = require('./controller/consultaController');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/pacientes', getPacientes);
router.get('/users/medicos', getMedicos);

router.post('/consultas', createConsulta);
router.get('/consultas', getConsultas);
router.get('/medicos/:idMedico/consultas', getConsultasByMedico);
router.get('/pacientes/:idPaciente/consultas', getConsultasByPaciente);

module.exports = router;