import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/api'; // Função de cadastro
import './Login.css';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  show: boolean; // Controla a exibição do modal
  onClose: () => void; // Callback para fechar o modal
}

const Login: React.FC<LoginProps> = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login e Cadastro
  const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha do usuário
  const [nome, setNome] = useState(''); // Estado para armazenar o nome (usado no cadastro)
  const [cpf, setCpf] = useState(''); // Estado para armazenar o CPF
  const [telefone, setTelefone] = useState(''); // Estado para armazenar o telefone (usado no cadastro)
  const [role, setRole] = useState('CLIENTE'); // CLIENT por padrão (campo usado no cadastro)
  const [message, setMessage] = useState<string | null>(null); // Mensagem de sucesso
  const [error, setError] = useState<string | null>(null); // Mensagem de erro
  const navigate = useNavigate(); //Para navegar entre as páginas


  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
    setError(null); // Limpa mensagens de erro anteriores

    try {
      const response = await fetch('http://localhost:4000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ cpf, senha }), // Envia o cpf e senha para o backend
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva o token no localStorage para autenticação
        setMessage('Login realizado com sucesso!');
        console.log('Valor de data.role:', data);
        onClose(); // Fecha o modal após login bem-sucedido

        // Redirecionamento com base no role
        if (data.role === 'ADMIN') {
          navigate('/admin'); // Redireciona para admin se o role for ADMIN
        } else if (data.role === 'CLIENTE') { // Senão redireciona para agendamento
          console.log("Antes do navigate");
          navigate('/agendamento');
          console.log("Deveria ter ido para agendamento");
        } else {
          console.log('Role não reconhecido:', data.role);
          
        }
      } else {
        setError(data.error || 'Erro ao fazer login.'); // Define mensagem de erro recebida do backend
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.'); // Erro genérico em caso de falha de comunicação
    }
  };

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
    setMessage(null); // Limpa mensagens de sucesso anteriores
    setError(null); // Limpa mensagens de erro anteriores

    try {
      const response = await cadastrarUsuario({ nome, email, cpf, telefone, senha, role }); // Chama a função de cadastro
      setMessage('Usuário cadastrado com sucesso!'); // Exibe mensagem de sucesso
      setIsLogin(true); // Alterna para a tela de login após o cadastro
      console.log("ESTA USANDO AQUI");

    } catch (err: any) {
      setError(err.message); // Exibe a mensagem de erro caso ocorra
    }
  };

  if (!show) return null; // Retorna null se o modal não estiver visível

  return (
    <div className="login-modal">
      <div className="login-content">
        <button onClick={onClose} className="close-btn">&times;</button> {/* Botão para fechar o modal */}
        {isLogin ? ( // Exibe o formulário de login se estiver no modo login
          <>
            <h2>Login</h2>
            {message && <p className="success-message">{message}</p>} {/* Mensagem de sucesso */}
            {error && <p className="error-message">{error}</p>} {/* Mensagem de erro */}
            <form onSubmit={fazerLogin}>
              <input
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)} // Atualiza o estado do CPF
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
                required
              />
              <button type="submit">Entrar</button> {/* Botão de login */}
            </form>
            <p>
              Não tem uma conta?{' '}
              <button className="toggle-btn" onClick={() => setIsLogin(false)}>
                Cadastre-se aqui
              </button> {/* Botão para alternar para a tela de cadastro */}
            </p>
          </>
        ) : (
          <form onSubmit={cadastrar}>
            <h2>Cadastro</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <div>
              <label>Nome:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>CPF:</label>
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="CLIENTE">Cliente</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button type="submit">Cadastrar</button>
            <p onClick={() => setIsLogin(true)}>Já tem uma conta? Faça login</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
