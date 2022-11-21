const data = require("../db/data");

class TeacherController {
  async getAllTeachers(_req, res) {
    const retrievedTeachers = data.teachers;
    return res.status(200).json(retrievedTeachers);
  }

  async saveTeacher(req, res) {
    const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const newTeacher = { id, numeroEmpleado, nombres, apellidos, horasClase };
    data.teachers.push(newTeacher);
    return res.status(201).json(newTeacher);
  }

  async getTeacher(req, res) {
    const { id } = req.params;
    const foundedTeacher = data.teachers.find((teacher) => teacher.id == id);
    if (!foundedTeacher) {
      return res.status(404).json({ message: "Teacher doesn't exists" });
    }

    return res.status(200).json(foundedTeacher);
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
    const teacherIndex = data.teachers.findIndex((teacher) => teacher.id == id);
    if (teacherIndex === -1) {
      return res.status(404).json({ message: "Teacher doesn't exists" });
    }
    data.teachers[teacherIndex] = { ...updatedTeacherData };
    return res.status(200).json({ message: "Teacher data updated" });
  }

  async deleteTeacher(req, res) {
    const { id } = req.params;
    const foundedTeacher = data.teachers.find((teacher) => teacher.id == id);
    if (!foundedTeacher) {
      return res.status(404).json({ message: "Teacher doesn't exists" });
    }
    const filteredTeachers = data.teachers.filter(
      (teacher) => teacher.id != id
    );
    data.teachers = filteredTeachers;
    return res.status(200).json({ message: "Deleted teacher" });
  }
}

module.exports = new TeacherController();
