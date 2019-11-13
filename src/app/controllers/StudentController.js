import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    console.log(req.userId);

    return res.json({ message: 'ok' });
  }
}

export default new StudentController();
