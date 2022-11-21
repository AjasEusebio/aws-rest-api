const router = require("express").Router();

const StudentController = require("./app/controllers/StudentController");
const TeacherController = require("./app/controllers/TeacherController");
const studentValidator = require("./app/validators/StudentValidator");
const teacherValidator = require("./app/validators/TeacherValidator");

const methodNotAllowed = (_req, res, _next) => {
  res.status(405).json({ message: "unsupported method" });
};

router.get("/alumnos", StudentController.getAllStudents);
router.post("/alumnos", studentValidator.check, StudentController.saveStudent);

router.get("/alumnos/:id", StudentController.getStudent);
router.delete("/alumnos/:id", StudentController.deleteStudent);
router.put(
  "/alumnos/:id",
  studentValidator.check,
  StudentController.updateStudent
);

router.get("/profesores", TeacherController.getAllTeachers);
router.post(
  "/profesores",
  teacherValidator.check,
  TeacherController.saveTeacher
);

router.get("/profesores/:id", TeacherController.getTeacher);
router.delete("/profesores/:id", TeacherController.deleteTeacher);
router.put(
  "/profesores/:id",
  teacherValidator.check,
  TeacherController.updateTeacher
);

router.all("/profesores", methodNotAllowed);
router.all("/alumnos", methodNotAllowed);

module.exports = router;