import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Paciente = sequelize.define("paciente", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: Sequelize.STRING,
    cpf: {
        type: Sequelize.STRING,
        unique: true,
    },
    data_nascimento: Sequelize.DATEONLY,
});

export default Paciente
