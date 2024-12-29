// nessa página listarei todas as rotas e protegerei as que precisarem de login
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
import './index.css';
import Agendamento from './pages/Agendamento/Agendamento';
import Admin from './pages/Admin/Admin';
import ProtetorRotas from './components/ProtetorRotas/ProtetorRotas';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route
          path='/agendamento' element={<ProtetorRotas role="CLIENTE">
            <Agendamento />
          </ProtetorRotas>
          } />
        <Route
          path="/admin" element={<ProtetorRotas role="ADMIN">
            <Admin />
          </ProtetorRotas>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
