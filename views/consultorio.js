import { DateTime } from "luxon";
import {
    data_formatada,
    exibir,
    horario_formatado,
    tempo_formatado,
} from "../utils/view.js";

class ConsultorioView {
    constructor() {}

    listar_pacientes(pacientes) {
        exibir("Pacientes:");
        exibir("-----------------------------------------------------------");
        exibir("CPF         Nome                              Dt.Nasc.  Idade");
        exibir("-----------------------------------------------------------");
        pacientes.forEach((paciente) => {
            const data = DateTime.fromString(
                paciente.data_nascimento,
                "yyyy-MM-dd"
            );
            const data_nascimento = data.toFormat("dd/MM/yyyy");
            const idade = Math.round(
                DateTime.now().diff(data, "years").toObject().years
            );
            exibir(
                `${paciente.cpf} ${paciente.nome.padEnd(33, " ")} ${data_nascimento} ${idade}`
            );
            const consultas = paciente.consulta?.map((consulta) => consulta.toJSON());

            if (!consultas || consultas.length === 0) return;
            const ultima_consulta = consultas[consultas.length - 1];
            const data_inicial = DateTime.fromJSDate(ultima_consulta.data_inicial);
            const data_final = DateTime.fromJSDate(ultima_consulta.data_final);
            if (data_inicial > DateTime.now().toLocal()) {
                exibir(
                    `            Agendado para ${data_inicial.toFormat("dd/MM/yyyy")} `
                );
                exibir(
                    `            ${data_inicial.toFormat("HH:mm")} às ${data_final.toFormat("HH:mm")}`
                );
            }
        });
        exibir("-----------------------------------------------------------");
    }

    async listar_agenda(consultas) {
        exibir("Consultas:");
        exibir(
            "------------------------------------------------------------------------"
        );
        exibir(
            "Data        H.Ini H.Fim Tempo Nome                       Dt.Nasc. "
        );
        consultas.forEach(
            ({ data_inicial, data_final, paciente }, index) => {
                const data_f = data_formatada(data_inicial);
                const horario_inicial_formatado =
                    horario_formatado(data_inicial);
                const horario_final_formatado = horario_formatado(data_final);

                const duracao = DateTime.fromJSDate(data_final)
                    .diff(DateTime.fromJSDate(data_inicial), [
                        "hours",
                        "minutes",
                    ])
                    .toObject();

                const data =
                    index !== 0 &&
                    data_f === data_formatada(consultas[index - 1].date)
                        ? "".padStart(10, " ")
                        : data_f;

                const data_nascimento = DateTime.fromString(
                    paciente.data_nascimento,
                    "yyyy-MM-dd"
                ).toFormat("dd/MM/yyyy");

                exibir(
                    `${data} ${horario_inicial_formatado} ${horario_final_formatado}  ${tempo_formatado(duracao)} ${paciente.nome.padEnd(24, " ")} ${data_nascimento}`
                );
            }
        );
        exibir(
            "------------------------------------------------------------------------"
        );
    }
}

export default ConsultorioView;
