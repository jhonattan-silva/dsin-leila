import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // URL do backend
});

export const cadastrarUsuario = async (dados: {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    role?: string;
}) => {
    try {
        const response = await api.post('/usuarios/cadastro', dados);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Erro ao cadastrar usuário.');
    }
};

export default api;