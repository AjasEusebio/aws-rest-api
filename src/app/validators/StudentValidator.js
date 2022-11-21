const Joi = require("joi");
const httpStatus = require("../utils/httpStatusCodes");

class StudentValidator {
  check(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().integer().positive().required(),
      nombres: Joi.string().trim().required(),
      apellidos: Joi.string().trim().required(),
      matricula: Joi.string().trim().required(),
      promedio: Joi.number().precision(2).required(),
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

module.exports = new StudentValidator();
