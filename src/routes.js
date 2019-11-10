import { Router } from 'express';

import User from './app/models/User';
import Student from './app/models/Student';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Lucas Alexander',
    email: 'lucasemail@email.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
