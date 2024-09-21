import React, { useState, useEffect } from 'react';
import { fetchConsultasByPaciente } from '../../services/apiService';
import NotificacaoConsultasComponent from '../../components/NotificacaoConsultasComponent/NotificacaoConsultasComponent';

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
      <NotificacaoConsultasComponent consultas={consultas} tipoUsuario="paciente" />
    </div>
  );
}

export default PacientePage;
