import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/api';
import './Cadastro.css';

interface CadastroProps {
    show: boolean; // Controla a exibição do modal
    onClose: () => void; // Callback para fechar o modal
}

const Cadastro: React.FC<CadastroProps> = ({ show, onClose }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('CLIENT');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await cadastrarUsuario({ nome, email, cpf, senha, role });
            setMessage('Usuário cadastrado com sucesso!');
            setNome('');
            setEmail('');
            setCpf('');
            setSenha('');
            setRole('CLIENT');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>
                <h2>Cadastro de Usuário</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
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
            </div>
        </div>
    );
};

export default Cadastro;
