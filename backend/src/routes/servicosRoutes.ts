import express from 'express';
import { listaServicos } from '../controllers/servicosController';

const router = express.Router();

router.get('/listaServicos', listaServicos); // Rota para buscar a lista de serviços);

export default router;
