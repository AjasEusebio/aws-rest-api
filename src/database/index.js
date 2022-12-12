const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const connection = new Sequelize(dbConfig);

Student.init(connection);
Teacher.init(connection);

module.exports = connection;
