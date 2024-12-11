import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agendamento.css';

const Agendamento: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null); // Estado da data selecionada
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Estado dos serviços selecionados
  const [activeTab, setActiveTab] = useState<'agendados' | 'concluidos'>('agendados'); // Aba ativa

  const services = ['Corte', 'Coloração', 'Manicure', 'Pedicure']; // Lista de serviços

  const agendados = [
    { id: 1, data: '10/12/2024', servicos: ['Corte', 'Coloração'], status: 'Pendente' },
    { id: 2, data: '15/12/2024', servicos: ['Manicure'], status: 'Confirmado' },
  ]; // Dados fictícios de agendamentos em aberto

  const concluidos = [
    { id: 1, data: '05/12/2024', servicos: ['Pedicure'], status: 'Concluído' },
    { id: 2, data: '01/12/2024', servicos: ['Corte'], status: 'Concluído' },
  ]; // Dados fictícios de agendamentos concluídos

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    if (!date || selectedServices.length === 0) {
      alert('Por favor, selecione uma data e pelo menos um serviço.');
      return;
    }
    console.log({ date, selectedServices });
    alert('Agendamento confirmado!');
  };

  return (
    <div className="agendamento-container">
      <h1>Agende seu horário</h1>

      <div className="calendar-container">
        <h2>Escolha uma data:</h2>
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
        />
      </div>

      <div className="services-container">
        <h2>Escolha os serviços:</h2>
        {services.map((service) => (
          <label key={service} className="service-item">
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => handleServiceToggle(service)}
            />
            {service}
          </label>
        ))}
      </div>

      <div className="summary-container">
        <h2>Resumo:</h2>
        <p>
          Data escolhida:{' '}
          {date ? date.toLocaleDateString() : 'Nenhuma data selecionada'}
        </p>
        <p>Serviços selecionados: {selectedServices.join(', ') || 'Nenhum'}</p>
      </div>

      <button onClick={handleSubmit} className="confirm-btn">
        Confirmar Agendamento
      </button>

      {/* Abas de Agendamentos */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={activeTab === 'agendados' ? 'active-tab' : ''}
            onClick={() => setActiveTab('agendados')}
          >
            Agendados
          </button>
          <button
            className={activeTab === 'concluidos' ? 'active-tab' : ''}
            onClick={() => setActiveTab('concluidos')}
          >
            Concluídos
          </button>
        </div>
        <div className="tabs-content">
          {activeTab === 'agendados' && (
            <ul>
              {agendados.map((agendamento) => (
                <li key={agendamento.id}>
                  <strong>Data:</strong> {agendamento.data} <br />
                  <strong>Serviços:</strong> {agendamento.servicos.join(', ')}{' '}
                  <br />
                  <strong>Status:</strong> {agendamento.status}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'concluidos' && (
            <ul>
              {concluidos.map((agendamento) => (
                <li key={agendamento.id}>
                  <strong>Data:</strong> {agendamento.data} <br />
                  <strong>Serviços:</strong> {agendamento.servicos.join(', ')}{' '}
                  <br />
                  <strong>Status:</strong> {agendamento.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
