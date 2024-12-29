import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agendamento.css';
import Profile from '../../components/Profile/Profile';
import { decodeToken } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const Agendamento: React.FC = () => {
  const [dia, setDia] = useState<Date | null>(null); // Data selecionada
  const [horaInicio, setHoraInicio] = useState<string | null>(null); // Hora de início
  const [horaFim, setHoraFim] = useState<string | null>(null); // Hora de término
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]); // Serviços escolhidos
  const [userName, setUserName] = useState<string>(''); // Nome do usuário
  const [userId, setUserId] = useState<string>(''); // ID do usuário
  const [agendamentos, setAgendamentos] = useState<any[]>([]); // Agendamentos
  const [servicos, setServicos] = useState<{ id: number; nome: string }[]>([]); // Lista de serviços dinâmicos
  const navigate = useNavigate();

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token); // Adicione este log para verificar se o token está presente
    if (token) {
      const payload = decodeToken(token);
      if (payload) {
        setUserName(payload.nome);
        setUserId(payload.id);
      }
    }
  }, []);

  useEffect(() => {
    // Busca os serviços do backend
    const fetchServicos = async () => {
      try {
        const response = await fetch('http://localhost:4000/servicos/listaServicos');
        const data = await response.json();
        if (response.ok) {
          setServicos(data); // Armazena a lista de serviços no estado
        } else {
          alert(data.error || 'Erro ao carregar serviços.');
        }
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        alert('Erro ao carregar serviços.');
      }
    };

    fetchServicos();
  }, []);

  useEffect(() => {
    // Busca os agendamentos do cliente
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/agendamentos/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setAgendamentos(data); // Armazena a lista de agendamentos no estado
        } else {
          alert(data.error || 'Erro ao carregar agendamentos.');
        }
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        alert('Erro ao carregar agendamentos.');
      }
    };

    if (userId) {
      fetchAgendamentos();
    }
  }, [userId]);

  const escolhaServicos = (servicoId: number) => {
    setServicosSelecionados((prev) =>
      prev.includes(servicoId.toString())
        ? prev.filter((id) => id !== servicoId.toString())
        : [...prev, servicoId.toString()]
    );
  };

  const agendar = async () => {
    if (!dia || !horaInicio || !horaFim || servicosSelecionados.length === 0) {
      alert('Por favor, selecione uma data, horários de início e fim, e pelo menos um serviço.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para agendar um serviço.');
      navigate('/login');
      return;
    }

    try {
      const dataHoraInicio = new Date(dia);
      const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
      dataHoraInicio.setHours(horaInicioHoras, horaInicioMinutos);

      const dataHoraFim = new Date(dia);
      const [horaFimHoras, horaFimMinutos] = horaFim.split(':').map(Number);
      dataHoraFim.setHours(horaFimHoras, horaFimMinutos);

      console.log("Data e Hora de Início:", dataHoraInicio); // Log para verificar data e hora de início
      console.log("Data e Hora de Fim:", dataHoraFim); // Log para verificar data e hora de fim

      const response = await fetch('http://localhost:4000/agendamentos/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataHoraInicio,
          dataHoraFim,
          servicoId: parseInt(servicosSelecionados[0]),
          usuarioId: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Agendamento criado com sucesso!');
        setAgendamentos([...agendamentos, data]);
      } else {
        alert(data.error || 'Erro ao criar agendamento.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao agendar horário.');
    }
  };

  return (
    <>
      <Profile userName={userName} />
      <div className="agendamento-container">
        <h1>Agende seu horário</h1>

        <div className="calendar-container">
          <h2>Escolha uma data:</h2>
          <Calendar onChange={(value) => setDia(value as Date)} value={dia} />
        </div>

        <div className="horarios-container">
          <h2>Escolha um horário de início:</h2>
          {horariosDisponiveis.map((horario) => (
            <label key={horario} className="horario-item">
              <input
                type="radio"
                name="horaInicio"
                value={horario}
                checked={horaInicio === horario}
                onChange={() => setHoraInicio(horario)}
              />
              {horario}
            </label>
          ))}
        </div>

        <div className="horarios-container">
          <h2>Escolha um horário de fim:</h2>
          {horariosDisponiveis.map((horario) => (
            <label key={horario} className="horario-item">
              <input
                type="radio"
                name="horaFim"
                value={horario}
                checked={horaFim === horario}
                onChange={() => setHoraFim(horario)}
              />
              {horario}
            </label>
          ))}
        </div>

        <div className="services-container">
          <h2>Escolha os serviços:</h2>
          {servicos.map((servico) => (
            <label key={servico.id} className="service-item">
              <input
                type="checkbox"
                checked={servicosSelecionados.includes(servico.id.toString())}
                onChange={() => escolhaServicos(servico.id)}
              />
              {servico.nome}
            </label>
          ))}
        </div>

        <button onClick={agendar}>Agendar</button>

        <div className="summary-container">
          <h2>Resumo:</h2>
          <p>Data escolhida: {dia ? dia.toLocaleDateString() : 'Nenhuma data selecionada'}</p>
          <p>Horário de início escolhido: {horaInicio || 'Nenhum horário de início selecionado'}</p>
          <p>Horário de fim escolhido: {horaFim || 'Nenhum horário de fim selecionado'}</p>
          <p>Serviços escolhidos: {servicosSelecionados.map(id => servicos.find(servico => servico.id.toString() === id)?.nome).join(', ')}</p>
        </div>

        <div className="agendamentos-container">
          <h2>Seus Agendamentos:</h2>
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="agendamento-item">
              <p>Data: {new Date(agendamento.dataHoraInicio).toLocaleDateString()}</p>
              <p>Horário de início: {new Date(agendamento.dataHoraInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Horário de fim: {new Date(agendamento.dataHoraFim).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Serviços: {agendamento.servicos ? agendamento.servicos.join(', ') : 'Nenhum serviço selecionado'}</p>
              <p>Status: {agendamento.status}</p>
              <button onClick={() => console.log('Remover:', agendamento.id)}>Remover</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Agendamento;
