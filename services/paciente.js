import { Consulta, Paciente } from "../models/index.js";
import {
    inserir_cpf,
    inserir_data_nascimento,
    inserir_nome,
} from "../utils/user_inputs.js";
import { alertar } from "../utils/view.js";

class PacienteService {
    constructor() {}

    async new() {
        const cpf = inserir_cpf();
        const nome = inserir_nome();
        const data_nascimento = inserir_data_nascimento();
        const data = data_nascimento.toFormat("yyyy-MM-dd");
        try {
            await Paciente.create({ cpf, nome, data_nascimento: data });
        } catch (error) {
            console.log(error);
            alertar("Erro ao cadastrar paciente");
        }
    }

    async get_pacientes(order = "nome") {
        try {
            const pacientes = await Paciente.findAll({
                include: [{ model: Consulta }],
                order: [[order, "ASC"]],
            });
            return pacientes;
        } catch (error) {
            alertar("Erro ao buscar pacientes");
            return [];
        }
    }

    async get_paciente(cpf) {
        try {
            const paciente = await Paciente.findOne({ where: { cpf } });
            return paciente;
        } catch (error) {
            alertar("Erro ao buscar paciente");
            return [];
        }
    }

    async delete(cpf) {
        try {
            await Paciente.destroy({ where: { cpf } });
        } catch (error) {
            alertar("Erro ao excluir paciente");
        }
    }
}

export default PacienteService;
