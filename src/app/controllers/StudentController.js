const Student = require('../models/Student');
const httpStatus = require("../utils/httpStatusCodes");
const upload = require("../../config/awsS3");

require('dotenv').config();

class StudentController {
  async getAllStudents(_req, res) {
    const retrievedStudents = await Student.findAll();
    return res.status(httpStatus.OK).json(retrievedStudents);
  }

  async saveStudent(req, res) {
    const { nombres, apellidos, matricula, promedio } = req.body;
    const newStudent = { nombres, apellidos, matricula, promedio };
    const createdStudent = await Student.create(newStudent);
    return res.status(httpStatus.CREATED).json(createdStudent);
  }

  async getStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = await Student.findByPk(parseInt(id))
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
      nombres,
      apellidos,
      matricula,
      promedio,
    };
    const studentfounded = await Student.findByPk(id);
    if (!studentfounded) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Student doesn't exists" });
    }
    await Student.update(updatedStudentData, { where: { id } })
    return res.status(httpStatus.OK).json({ message: "Student data updated" });
  }

  async deleteStudent(req, res) {
    const { id } = req.params;
    const foundedStudent = await Student.findByPk(id);
    if (!foundedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Student doesn't exists" });
    }
    await foundedStudent.destroy();
    return res.status(httpStatus.OK).json({ message: "Student deleted" });
  }

  async uploadFotoPerfil(req, res) {
    const id = parseInt(req.params.id);
    const foundedStudent = await Student.findByPk(id);
    if (!foundedStudent) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Student doesn't exist" });
    }

    upload.single('foto')(req, res, async function (err) {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST)
          .json({ message: "There was an error", error: err.message });
      }

      const updateValues = { fotoPerfilUrl: req.file.location };
      await Student.update(updateValues, { where: { id } });
      const studentfounded = await Student.findByPk(id);

      return res.status(httpStatus.OK).json(studentfounded);
    })
  }

}

module.exports = new StudentController();
