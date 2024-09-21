import React from 'react';
import './NotificacaoConsultasComponent.css';

function NotificacaoConsultasComponent({ consultas, tipoUsuario }) {
  return (
    <div className="notificacoes-container">
      <h1>{tipoUsuario === 'medico' ? 'Consultas Agendadas' : 'Suas Consultas'}</h1>
      {consultas.length === 0 ? (
        <p className="no-consultas">Nenhuma consulta agendada.</p>
      ) : (
        <div className="consultas-lista">
          {consultas.map((consulta) => (
            <div key={consulta.idConsulta} className="consulta-item">
              <div className="consulta-info">
                {tipoUsuario === 'medico' ? (
                  <>
                    <h3>Paciente: {consulta.paciente}</h3>
                    <p>Data: {consulta.dataConsulta}</p>
                    <p>Descrição: {consulta.descricao}</p>
                  </>
                ) : (
                  <>
                    <h3>Médico: {consulta.medico}</h3>
                    <p>Data: {consulta.dataConsulta}</p>
                    <p>Descrição: {consulta.descricao}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificacaoConsultasComponent;
