import sequelize from "../config/database.js";
import Consulta from "./consulta.js";
import Paciente from "./paciente.js";

const db = {
    sequelize,
    Paciente,
    Consulta,
}

export default db
