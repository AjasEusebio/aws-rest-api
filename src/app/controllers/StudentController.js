const data = require("../db/data");

class StudentController {
  async getAllStudents(_req, res) {
    const retrievedStudents = data.students;
    return res.status(200).json(retrievedStudents);
  }

  async saveStudent(req, res) {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const newStudent = { id, nombres, apellidos, matricula, promedio };
    data.students.push(newStudent);
    return res.status(201).json(newStudent);
  }

  async getStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = data.students.find((student) => student.id == id);
    if (!foundedStudent) {
      return res.status(404).json({ message: "Student doesn't exists" });
    }

    return res.status(200).json(foundedStudent);
  }

  async updateStudent(req, res) {
    const { alumnoId } = req.params;
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const updatedStudentData = { id, nombres, apellidos, matricula, promedio };
    const studentIndex = data.students.findIndex(
      (student) => student.id == alumnoId
    );
    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student doesn't exists" });
    }
    data.students[studentIndex] = { ...updatedStudentData };
    return res.status(200).json({ message: "Student data updated" });
  }

  async deleteStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = data.students.find((student) => student.id == id);
    if (!foundedStudent) {
      return res.status(404).json({ message: "Student doesn't exists" });
    }
    const filteredStudents = data.students.filter(
      (student) => student.id != id
    );
    data.students = filteredStudents;
    return res.status(200).json({ message: "Student deleted" });
  }

  async unssuportedMethod(_req, res, _next) {
    return res.status(405).json({ message: "unsupported method" });
  }
}

module.exports = new StudentController();
