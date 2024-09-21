import React from 'react';

function BotaoVoltarComponent() {
  const handleVoltar = () => {
    window.location.reload();
  };

  return (
    <button onClick={handleVoltar} style={botaoStyle}>
      Voltar para Login
    </button>
  );
}

const botaoStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '20%',
  padding: '10px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  textAlign: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
};

export default BotaoVoltarComponent;
