import express from 'express';
import { cadUser, loginUser } from '../controllers/usuariosController';
import { permissoes } from '../middlewares/permissoes';

const router = express.Router();

router.post('/cadastro', cadUser); // Rota para cadastro
router.post('/login', loginUser); // Rota para login

// Rota protegida para admins
router.get('/admin', permissoes('ADMIN'), (req, res) => {
  res.status(200).json({ message: 'Bem-vinda, chefe!' });
});

//Rota protegida para clientes
router.get('/agendamento', permissoes('CLIENTE'), (req, res) => {
  res.status(200).json({ message: 'Bem-vindo, cliente!' });
});

export default router;
