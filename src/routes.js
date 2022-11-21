const router = require("express").Router();

const StudentController = require("./app/controllers/StudentController");
const TeacherController = require("./app/controllers/TeacherController");
const studentValidator = require("./app/validators/StudentValidator");
const teacherValidator = require("./app/validators/TeacherValidator");

router
  .route("/alumnos")
  .get(StudentController.getAllStudents)
  .post(studentValidator.check, StudentController.saveStudent)
  .all(StudentController.unssuportedMethod);

router
  .route("alumnos/:id")
  .get(StudentController.getStudent)
  .delete(StudentController.deleteStudent)
  .put(studentValidator.check, StudentController.updateStudent);

router
  .route("/profesores")
  .get(TeacherController.getAllTeachers)
  .post(teacherValidator.check, TeacherController.saveTeacher)
  .all(TeacherController.unssuportedMethod);

router
  .route("/profesores/:id")
  .get(TeacherController.getTeacher)
  .delete(TeacherController.deleteTeacher)
  .put(teacherValidator.check, TeacherController.updateTeacher);

module.exports = router;
