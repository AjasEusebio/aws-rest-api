const Joi = require("joi");
class TeacherValidator {
  check(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().integer().positive().required(),
      numeroEmpleado: Joi.number().integer().positive().required(),
      nombres: Joi.string().trim().required(),
      apellidos: Joi.string().trim().required(),
      horasClase: Joi.number().integer().positive().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Hubo errores", error });
    }
    next();
  }
}

module.exports = new TeacherValidator();
