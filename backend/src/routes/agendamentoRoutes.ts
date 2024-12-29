import express from 'express';
import { addAgendamento, editAgendamento, deleteAgendamento } from '../controllers/agendamentoController';

const router = express.Router();

// Rota para adicionar um novo agendamento
router.post('/agendar', addAgendamento);

// Rota para editar um agendamento existente
router.put('/agendados/:id', editAgendamento);

// Rota para remover um agendamento existente
router.delete('/agendados/:id', deleteAgendamento);

export default router;