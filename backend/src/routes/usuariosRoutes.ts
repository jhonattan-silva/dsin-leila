import { Router } from 'express';
import { cadUser, loginUser } from '../controllers/usuariosController';
import { permissoes } from '../middlewares/permissoes';

const usuariosRoutes = Router();

usuariosRoutes.post('/cadastro', cadUser); // Rota para cadastro
usuariosRoutes.post('/login', loginUser); // Rota para login

// Rota protegida para admins
usuariosRoutes.get('/admin', permissoes('ADMIN'), (req, res) => {
  res.status(200).json({ message: 'Bem-vinda, chefe!' });
});

export default usuariosRoutes;
