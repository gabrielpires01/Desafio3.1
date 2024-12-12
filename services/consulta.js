import { Sequelize } from "sequelize";
import { inserir_data, inserir_horario } from "../utils/appointment_input.js";
import { DateTime } from "luxon";
import { Paciente, Consulta } from "../models/index.js";

class ConsultaService {
    constructor() {}

    async new(user_id) {
        const data = inserir_data();
        const horario_inicial = inserir_horario();
        const horario_final = inserir_horario(horario_inicial);
        const data_inicial = this.data_com_duracao(data, horario_inicial);
        const data_final = this.data_com_duracao(data, horario_final);
        const has_consulta = await this.get_consulta_futura(user_id);

        if (has_consulta) {
            alertar("Paciente está agendado");
            return;
        }
        try {
            await Consulta.create({
                data_inicial: data_inicial.toFormat("yyyy-MM-dd HH:mm"),
                data_final: data_final.toFormat("yyyy-MM-dd HH:mm"),
                paciente_id: user_id,
            });
        } catch (error) {
            alertar("Erro ao cadastrar consulta");
        }
    }

    async get_consultas(
        data_inicial = null,
        data_final = null,
        include_pacientes = false
    ) {
        const query = {
            where: {},
            order: [["data_inicial", "DESC"]],
        };

        if (data_inicial && data_final) {
            query.where.data_inicial = {
                [Sequelize.Op.between]: [
                    data_inicial.toFormat("yyyy-MM-dd HH:mm"),
                    data_final.toFormat("yyyy-MM-dd HH:mm"),
                ],
            };
        }
        if (include_pacientes) {
            query.include = [{ model: Paciente }];
        }

        return await Consulta.findAll(query);
    }

    async get_consulta_por_paciente(user_id) {
        return await Consulta.findAll({ where: { paciente_id: user_id } });
    }

    async get_consulta_futura(user_id, data = DateTime.now().toLocal()) {
        const consulta = await Consulta.findOne({
            where: {
                paciente_id: user_id,
                data_inicial: data.toJSDate(),
            },
        });
        return consulta?.toJSON();
    }

    async cancelar(consulta_id) {
        try {
            return await Consulta.destroy({ where: { id: consulta_id } });
        } catch (error) {
            alertar("Erro ao cancelar consulta");
        }
    }

    data_com_duracao(data, horario_inicial) {
        return data.plus({
            hours: horario_inicial.hour,
            minutes: horario_inicial.minute,
        });
    }

    hora_formatada(horario) {
        return horario.toFormat("HH:mm");
    }


    duracao(horario_inicial, horario_final) {
        return horario_final
            .diff(horario_inicial, ["hours", "minutes"])
            .toObject();
    }

    tempo_formatado(duracao) {
        return `${duracao.hours}:${duracao.minutes}`;
    }
}

export default ConsultaService;
