const httpStatus = require("../utils/httpStatusCodes");
const Teacher = require("../models/Teacher");

class TeacherController {
  async getAllTeachers(_req, res) {
    const retrievedTeachers = await Teacher.findAll();
    return res.status(httpStatus.OK).json(retrievedTeachers);
  }

  async saveTeacher(req, res) {
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const newTeacher = { numeroEmpleado, nombres, apellidos, horasClase };
    const teacherCreated = await Teacher.create(newTeacher);
    return res.status(httpStatus.CREATED).json(teacherCreated);
  }

  async getTeacher(req, res) {
    const { id } = req.params;
    const foundedTeacher = await Teacher.findByPk(parseInt(id));
    if (!foundedTeacher) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Teacher doesn't exists" });
    }

    return res.status(httpStatus.OK).json(foundedTeacher);
  }

  async updateTeacher(req, res) {
    const { id } = req.params;
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const updatedTeacherData = {
      id,
      numeroEmpleado,
      nombres,
      apellidos,
      horasClase,
    };
    const teacherFounded = await Teacher.findByPk(id);
    if (!teacherFounded) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Teacher doesn't exists" });
    }
    await Teacher.update(updatedTeacherData, { where: { id } });
    return res.status(httpStatus.OK).json({ message: "Teacher data updated" });
  }

  async deleteTeacher(req, res) {
    const { id } = req.params;
    const foundedTeacher = await Teacher.findByPk(id);
    if (!foundedTeacher) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Teacher doesn't exists" });
    }
    await foundedTeacher.destroy();
    return res.status(httpStatus.OK).json({ message: "Deleted teacher" });
  }
}

module.exports = new TeacherController();
