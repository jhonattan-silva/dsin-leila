import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cadastro de usuário
export const cadUser = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, cpf, senha, role } = req.body;

  if (!nome || !email || !cpf || !senha) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        cpf,
        senha: hashedSenha,
        role: role || 'CLIENTE', // Será "CLIENTE" se não for especificado outro
      },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};


// Login de usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    res.status(400).json({ error: 'cpf e senha são obrigatórios.' });
    return;
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { cpf } });

    if (!usuario) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!isSenhaValida) {
      res.status(401).json({ error: 'Senha incorreta.' });
      return;
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};
