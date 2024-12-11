import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const permissoes = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Token não fornecido.' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

      if (decoded.role !== requiredRole) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
      }

      next(); // Chamando next() para passar para a próxima etapa
    } catch (error) {
      res.status(401).json({ error: 'Token inválido.' });
    }
  };
};
