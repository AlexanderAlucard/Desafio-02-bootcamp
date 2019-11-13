import jwt from 'jsonwebtoken';

import { promisify } from 'util';

import authConf from '../../config/Auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'User not allowed to do this' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConf.secret);

    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json('NOT ALLOWED');
  }

  return next();
};
