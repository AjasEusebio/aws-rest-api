const { Model, DataTypes } = require('sequelize');

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        numeroEmpleado: {
          type: DataTypes.INTEGER,
        },
        nombres: {
          type: DataTypes.STRING,
        },
        apellidos: {
          type: DataTypes.STRING,
        },
        horasClase: {
          type: DataTypes.INTEGER,
        },
      },
      { sequelize, tableName: 'Teachers' }
    );
  }
}

module.exports = Teacher;
