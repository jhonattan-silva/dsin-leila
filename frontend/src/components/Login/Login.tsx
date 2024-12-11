import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/api'; // Função de cadastro
import './Login.css';

interface LoginProps {
  show: boolean; // Controla a exibição do modal
  onClose: () => void; // Callback para fechar o modal
}

const Login: React.FC<LoginProps> = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login e Cadastro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [role, setRole] = useState('CLIENT'); // CLIENT por padrão
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar a lógica de login aqui
    console.log('Fazendo login:', { cpf, senha });
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await cadastrarUsuario({ nome, email, cpf, senha, role });
      setMessage('Usuário cadastrado com sucesso!');
      setIsLogin(true); // Volta para a tela de login após o cadastro
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!show) return null;

  return (
    <div className="login-modal">
      <div className="login-content">
        <button onClick={onClose} className="close-btn">&times;</button>
        {isLogin ? (
          <>
            <h2>Login</h2>
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="cpf"
                placeholder="Digite seu cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button type="submit">Entrar</button>
            </form>
            <p>
              Não tem uma conta?{' '}
              <button className="toggle-btn" onClick={() => setIsLogin(false)}>
                Cadastre-se aqui
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Cadastro</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleCadastro}>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="CLIENT">Cliente</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <button type="submit">Cadastrar</button>
            </form>
            <p>
              Já tem uma conta?{' '}
              <button className="toggle-btn" onClick={() => setIsLogin(true)}>
                Faça login aqui
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
