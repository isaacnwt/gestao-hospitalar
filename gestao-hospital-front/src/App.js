import React, { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';

function App() {

  useEffect(() => {
    alert('Usar email: admin@email.com');
  }, []);

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
