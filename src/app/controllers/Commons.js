const httpStatus = require("../utils/httpStatusCodes");

class Commons {
  methodNotAllowed = (_req, res, _next) => {
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .json({ message: "Unsupported method" });
  };

}

module.exports = new Commons();
