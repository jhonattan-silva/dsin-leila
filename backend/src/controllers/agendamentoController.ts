import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adicionar um novo agendamento
export const addAgendamento = async (req: Request, res: Response): Promise<void> => {
  const { dataHoraInicio, dataHoraFim, servicoId, usuarioId } = req.body;
  console.log("Request Body:", req.body); 
  console.log("Data e Hora de Início:", dataHoraInicio); // Log para verificar data e hora de início
  console.log("Data e Hora de Fim:", dataHoraFim); // Log para verificar data e hora de fim
  console.log("Serviço ID:", servicoId); 
  console.log("Usuário ID:", usuarioId); 

  try {
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        dataHoraInicio: new Date(dataHoraInicio),
        dataHoraFim: new Date(dataHoraFim),
        servicoId: servicoId,
        usuarioId: usuarioId,
        status: 'Pendente',
      },
    });

    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
};

// Editar um agendamento existente
export const editAgendamento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { dataHoraInicio, dataHoraFim, servicoId, status } = req.body;

  try {
    const agendamentoAtualizado = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: {
        dataHoraInicio: new Date(dataHoraInicio),
        dataHoraFim: new Date(dataHoraFim),
        servicoId,
        status,
      },
    });

    res.status(200).json({ message: 'Agendamento atualizado com sucesso!', agendamento: agendamentoAtualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
};

// Remover um agendamento existente
export const deleteAgendamento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.agendamento.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Agendamento removido com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover agendamento' });
  }
};