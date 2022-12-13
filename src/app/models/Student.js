const { Model, DataTypes } = require('sequelize');

class Student extends Model {
  static init(sequelize) {
    super.init({
      nombres: {
        type: DataTypes.STRING,
      },
      apellidos: {
        type: DataTypes.STRING,
      },
      matricula: {
        type: DataTypes.STRING,
      },
      promedio: {

        type: DataTypes.DOUBLE,
      },
      fotoPerfilUrl: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize, tableName: 'Students'
    })
  }
}

module.exports = Student;
