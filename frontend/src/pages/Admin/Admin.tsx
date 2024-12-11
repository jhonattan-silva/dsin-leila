import React, { useState } from 'react';
import Calendar from 'react-calendar';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Importa o tipo ApexOptions
import 'react-calendar/dist/Calendar.css';
import './Admin.css';

const Admin: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Data selecionada

  // Dados fictícios para agendamentos do dia
  const agendamentosDoDia = [
    { id: 1, horario: '08:00', cliente: 'João Silva', servico: 'Corte', status: 'Confirmado' },
    { id: 2, horario: '09:30', cliente: 'Ana Santos', servico: 'Coloração', status: 'Pendente' },
    { id: 3, horario: '11:00', cliente: 'Pedro Costa', servico: 'Manicure', status: 'Confirmado' },
  ];

  // Dados fictícios para gestão
  const totalClientes = agendamentosDoDia.length;
  const servicosPorTipo = [
    { servico: 'Corte', quantidade: 1 },
    { servico: 'Coloração', quantidade: 1 },
    { servico: 'Manicure', quantidade: 1 },
  ];
  const receitaEstimada = 200; // Valor fictício

  // Configuração do Gráfico de Barras
  const barChartOptions: ApexOptions = {
    chart: { type: 'bar', height: 350 },
    xaxis: { categories: servicosPorTipo.map((s) => s.servico) },
    title: { text: 'Quantidade de Serviços por Tipo', align: 'center' },
  };

  const barChartSeries = [
    {
      name: 'Quantidade',
      data: servicosPorTipo.map((s) => s.quantidade),
    },
  ];

  // Configuração do Gráfico de Pizza
  const pieChartOptions: ApexOptions = {
    chart: { type: 'pie', height: 350 },
    labels: servicosPorTipo.map((s) => s.servico),
    title: { text: 'Distribuição de Serviços', align: 'center' },
  };

  const pieChartSeries = servicosPorTipo.map((s) => s.quantidade);

  return (
    <div className="admin-container">
      {/* Primeira Metade: Agenda */}
      <div className="agenda-section">
        <h2>Agenda do Dia</h2>
        <Calendar onChange={(value) => setSelectedDate(value as Date)} value={selectedDate} />
        <h3>Agendamentos para {selectedDate.toLocaleDateString()}</h3>
        <ul className="agendamentos-list">
          {agendamentosDoDia.map((agendamento) => (
            <li key={agendamento.id} className="agendamento-item">
              <strong>Horário:</strong> {agendamento.horario} <br />
              <strong>Cliente:</strong> {agendamento.cliente} <br />
              <strong>Serviço:</strong> {agendamento.servico} <br />
              <strong>Status:</strong> {agendamento.status}
            </li>
          ))}
        </ul>
      </div>

      {/* Segunda Metade: Informações Gerenciais */}
      <div className="gestao-section">
        <h2>Informações Gerenciais</h2>
        <p><strong>Total de Clientes:</strong> {totalClientes}</p>
        <p><strong>Receita Estimada:</strong> R$ {receitaEstimada}</p>
        <h3>Serviços Realizados:</h3>
        <ul>
          {servicosPorTipo.map((servico) => (
            <li key={servico.servico}>
              {servico.servico}: {servico.quantidade}
            </li>
          ))}
        </ul>
      </div>

      {/* Gráficos */}
      <div className="charts-section">
        <h2>Análises</h2>
        <div className="chart-container">
          <div className="chart-item">
            <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
          </div>
          <div className="chart-item">
            <ReactApexChart options={pieChartOptions} series={pieChartSeries} type="pie" height={350} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
