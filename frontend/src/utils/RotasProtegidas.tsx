import React, { JSX } from 'react'; 
import { Navigate } from 'react-router-dom'; 

interface RotasProtegidasProps { // Define a interface para tipar as propriedades do componente.
  children: JSX.Element; // `children` será o elemento que o usuario estava tentando acessar, mas é protegido.
  isAuthenticated: boolean; // flag de verificação se está ou não logado.
}

const RotasProtegidas: React.FC<RotasProtegidasProps> = ({ children, isAuthenticated }) => { 
  // Declara o componente funcional `RotasProtegidas` com tipagem, recebendo as props desestruturadas.

  if (!isAuthenticated) { //se o usuario não está logado
    console.log('Você precisa estar logado para acessar esta página!'); //exibe no console    
    alert('Você precisa estar logado para acessar esta página!'); //exibe um alerta
    return <Navigate to="/" />; //redireciona para a Home
  }

  return children; //se estiver ok segue onde estava tentando ir
};

export default RotasProtegidas; 