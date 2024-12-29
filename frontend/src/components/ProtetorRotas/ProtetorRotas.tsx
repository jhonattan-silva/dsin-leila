import { jwtDecode } from 'jwt-decode';
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtetorRotasProps { // Interface para definir as propriedades do componente
  children: JSX.Element;    
  role?: string; // Permissão necessária para acessar a rota
}

const ProtetorRotas: React.FC<ProtetorRotasProps> = ({ children, role }) => {
  const token = localStorage.getItem('token'); // Recupera o token do localStorage

  if (!token) {// Se não houver token, redireciona para a página inicial
    console.log('Token não encontrado, redirecionando para a Home.');
    return <Navigate to="/" />;
  }

  try {
    // Decodifica o payload do token usando jwt-decode
    const payload: any = jwtDecode(token);

    console.log('Token decodificado:', payload);

    // Verifica se o role é exigido e se corresponde
    if (role && payload.role !== role) {
      console.log(`Role inválido: necessário ${role}, mas encontrado ${payload.role}`);
      return <Navigate to="/" />;
    }

    // Se tudo estiver correto, renderiza os filhos
    return children;
  } catch (error) {
    // Se o token for inválido ou ocorrer erro na decodificação, redireciona
    console.error('Erro ao decodificar o token:', error);
    return <Navigate to="/" />;
  }
};

export default ProtetorRotas;