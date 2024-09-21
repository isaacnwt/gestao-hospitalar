import React, { useState, useEffect } from 'react';
import { fetchConsultasByMedico } from '../../services/apiService';
import NotificacaoConsultasComponent from '../../components/NotificacaoConsultasComponent/NotificacaoConsultasComponent';

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
      <NotificacaoConsultasComponent consultas={consultas} tipoUsuario="medico" />
    </div>
  );
}

export default MedicoPage;
