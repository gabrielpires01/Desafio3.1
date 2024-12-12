import { Sequelize } from "sequelize";
import Paciente from "./paciente.js";
import sequelize from "../config/database.js";

const Consulta = sequelize.define("consulta", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_inicial: Sequelize.DATE,
    data_final: Sequelize.DATE,
    paciente_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Paciente,
            key: "id",
        },
    },
});

export default Consulta
