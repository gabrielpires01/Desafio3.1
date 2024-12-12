import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:strong_password@localhost:5432/desafio3_1');

sequelize.options.logging = false

export default sequelize
