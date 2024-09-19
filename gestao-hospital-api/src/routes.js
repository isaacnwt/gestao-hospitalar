const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('./controller/userController');
const { createConsulta, getConsultasByMedico, getConsultasByPaciente } = require('./controller/consultaController');

router.get('/api/users', getUsers);
router.post('/api/users', createUser);

router.post('/api/consultas', createConsulta);
// router.get('/api/medicos/:idMedico/consultas', getConsultasByMedico);
// router.get('/api/pacientes/:idPaciente/consultas', getConsultasByPaciente);

module.exports = router;