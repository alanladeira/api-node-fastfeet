//Middleware que verifica se o usuario esta logado

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  /* usamos a destruct para pegar somente o token vindo da auth, deixamos vazio
  o primeiro espaço */
  /* usamos o array.split, pois as informações da authHeader vem separadas
  por espaço */
  const [, token] = authHeader.split(' ');

  //caso a verificação do token for true, chamamos o next() da middleware
  try {
    /* o promisify permite usarmos async/await ao inves de callbacks */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    //passamos o parametro id pra req vindo do decoded
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
