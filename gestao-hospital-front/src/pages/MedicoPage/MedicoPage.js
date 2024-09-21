import React, { useState, useEffect } from 'react';
import { fetchConsultasByMedico } from '../../services/apiService';

function MedicoPage({ userId }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    async function loadConsultas() {
      try {
        const consultasList = await fetchConsultasByMedico(userId);
        setConsultas(consultasList);
      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
      }
    }

    loadConsultas();
  }, [userId]);

  return (
    <div>
      <h1>Consultas Agendadas</h1>
      {consultas.length === 0 ? (
        <p>Você não tem consultas agendadas.</p>
      ) : (
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.idConsulta}>
              Paciente: {consulta.paciente}, Data: {consulta.dataConsulta}, Descrição: {consulta.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MedicoPage;
