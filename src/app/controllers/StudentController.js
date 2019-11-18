import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const userExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (userExist) {
      return res.status(400).json({ error: 'Student alredy exists.' });
    }

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id } = req.body;
    const user = req.userId;
    const studentExist = await Student.findOne({ where: { id } });

    if (!studentExist) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const { name, email } = await studentExist.update(req.body);

    return res.json({
      user,
      id,
      name,
      email,
    });
  }
}

export default new StudentController();
