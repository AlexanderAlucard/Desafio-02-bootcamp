import * as Yup from 'yup';

import jwt from 'jsonwebtoken';

import AuthConf from '../../config/Auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User dos not exist' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password dos not math' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConf.secret, {
        expiresIn: AuthConf.expireIn,
      }),
    });
  }
}

export default new SessionController();
