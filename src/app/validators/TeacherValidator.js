const Joi = require("joi");
const httpStatus = require("../utils/httpStatusCodes");

class TeacherValidator {
  check(req, res, next) {
    const schema = Joi.object({
      numeroEmpleado: Joi.number().integer().positive().required(),
      nombres: Joi.string().trim().required(),
      apellidos: Joi.string().trim().required(),
      horasClase: Joi.number().integer().positive().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Missing or Incorrect fields", error });
    }
    next();
  }
}

module.exports = new TeacherValidator();
