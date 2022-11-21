const data = require("../db/data");
const httpStatus = require("../utils/httpStatusCodes");

class StudentController {
  async getAllStudents(_req, res) {
    const retrievedStudents = data.students;
    return res.status(httpStatus.OK).json(retrievedStudents);
  }

  async saveStudent(req, res) {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const newStudent = { id, nombres, apellidos, matricula, promedio };
    data.students.push(newStudent);
    return res.status(httpStatus.CREATED).json(newStudent);
  }

  async getStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = data.students.find((student) => student.id == id);
    if (!foundedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Student doesn't exists" });
    }

    return res.status(httpStatus.OK).json(foundedStudent);
  }

  async updateStudent(req, res) {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const updatedStudentData = {
      id,
      nombres,
      apellidos,
      matricula,
      promedio,
    };
    const studentIndex = data.students.findIndex((student) => student.id == id);
    if (studentIndex === -1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Student doesn't exists" });
    }
    data.students[studentIndex] = { ...updatedStudentData };
    return res.status(httpStatus.OK).json({ message: "Student data updated" });
  }

  async deleteStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = data.students.find((student) => student.id == id);
    if (!foundedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Student doesn't exists" });
    }
    const filteredStudents = data.students.filter(
      (student) => student.id != id
    );
    data.students = filteredStudents;
    return res.status(httpStatus.OK).json({ message: "Student deleted" });
  }
}

module.exports = new StudentController();
