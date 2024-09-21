import React, { useState, useEffect } from 'react';
import { fetchMedicos, fetchPacientes, addConsulta } from '../../services/apiService';
import './ConsultaPage.css';

function ConsultaPage() {
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [consulta, setConsulta] = useState({
        idMedico: '',
        idPaciente: '',
        dataConsulta: '',
        descricao: ''
    });

    useEffect(() => {
        async function loadMedicosPacientes() {
            try {
                const medicosList = await fetchMedicos();
                const pacientesList = await fetchPacientes();
                setMedicos(medicosList);
                setPacientes(pacientesList);
            } catch (error) {
                console.error('Erro ao carregar médicos ou pacientes:', error);
            }
        }

        loadMedicosPacientes();
    }, []);

    const handleAddConsulta = async (event) => {
        event.preventDefault();
        try {
            await addConsulta(consulta);
            alert('Consulta cadastrada com sucesso!');
            setConsulta({ idMedico: '', idPaciente: '', dataConsulta: '', descricao: '' }); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao cadastrar consulta:', error);
            alert('Erro ao cadastrar consulta.');
        }
    };

    return (
        <div className="container">
            <h1>Cadastrar Consulta</h1>

            <form onSubmit={handleAddConsulta}>
                <div className="form-row">
                    <select
                        value={consulta.idMedico}
                        onChange={(e) => setConsulta({ ...consulta, idMedico: e.target.value })}
                        required
                    >
                        <option value="">Selecione o Médico</option>
                        {medicos.map((medico) => (
                            <option key={medico.id} value={medico.id}>
                                {medico.nome}
                            </option>
                        ))}
                    </select>

                    <select
                        value={consulta.idPaciente}
                        onChange={(e) => setConsulta({ ...consulta, idPaciente: e.target.value })}
                        required
                    >
                        <option value="">Selecione o Paciente</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.id} value={paciente.id}>
                                {paciente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="date"
                    value={consulta.dataConsulta}
                    onChange={(e) => setConsulta({ ...consulta, dataConsulta: e.target.value })}
                    required
                />

                <textarea
                    placeholder="Descrição da Consulta"
                    value={consulta.descricao}
                    onChange={(e) => setConsulta({ ...consulta, descricao: e.target.value })}
                    required
                ></textarea>

                <button type="submit">Cadastrar Consulta</button>
            </form>
        </div>
    );
}

export default ConsultaPage;
