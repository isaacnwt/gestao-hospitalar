import React, { useState, useEffect } from 'react';
import { fetchConsultasByMedico } from '../../services/apiService';
import NotificacaoConsultasComponent from '../../components/NotificacaoConsultasComponent/NotificacaoConsultasComponent';
import BotaoVoltarComponent from '../../components/BotaoVoltarComponent';

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
      <BotaoVoltarComponent />
    </div>
  );
}

export default MedicoPage;
