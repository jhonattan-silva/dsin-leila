import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Login from '../../components/Login/Login';

const Home = () => {
  const navigate = useNavigate();

  const [abreLogin, setAbreLogin] = useState(false); //estados para abrir o modal de login, iniciando como falso


  return (
    <div className="home">
      <div className="overlay">
        <h1>Transforme seu visual com a Leila!</h1>
        <button onClick={() => setAbreLogin(true)}>AGENDE SEU HORÁRIO AGORA</button>
        <Login show={abreLogin} onClose={() => setAbreLogin(false)} />
      </div>
    </div>
  );
};

export default Home;
