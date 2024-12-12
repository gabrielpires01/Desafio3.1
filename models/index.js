import sequelize from "../config/database.js";
import Consulta from "./consulta.js";
import Paciente from "./paciente.js";

Paciente.hasMany(Consulta, { foreignKey: 'paciente_id' });
Consulta.belongsTo(Paciente, { foreignKey: 'paciente_id' });

const db = {
    sequelize,
    Paciente,
    Consulta,
}

export { db, Paciente, Consulta }
