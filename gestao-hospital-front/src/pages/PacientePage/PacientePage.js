import React, { useState, useEffect } from 'react';
import { fetchConsultasByPaciente } from '../../services/apiService';

function PacientePage({ userId }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    async function loadConsultas() {
      try {
        const consultasList = await fetchConsultasByPaciente(userId);
        setConsultas(consultasList);
      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
      }
    }

    loadConsultas();
  }, [userId]);

  return (
    <div>
      <h1>Suas Consultas</h1>
      {consultas.length === 0 ? (
        <p>Você não tem consultas agendadas.</p>
      ) : (
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.idConsulta}>
              Médico: {consulta.medico}, Data: {consulta.dataConsulta}, Descrição: {consulta.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PacientePage;
