import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controlador para buscar a lista de serviços
export const listaServicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const servico = await prisma.servico.findMany(); // findMany() retorna todos os registros da tabela

    // Resposta com os serviços encontrados
    res.status(200).json(servico);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);

    // Resposta em caso de erro
    res.status(500).json({ error: 'Erro ao buscar serviços. Tente novamente mais tarde.' });
  }
};
