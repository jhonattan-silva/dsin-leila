import express from 'express';
import { PrismaClient } from '@prisma/client';
import usuariosRoutes from './routes/usuariosRoutes';
const cors = require('cors'); // Garante permissao de requisições front->backend


const app = express();
const prisma = new PrismaClient();


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use('/usuarios', usuariosRoutes); //rota login

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
