import { DateTime } from "luxon";
import { data_formatada, exibir, tempo_formatado } from "../utils/view.js";

class ConsultorioView {
    constructor() {}

    listar_pacientes(order = "nome", pacientes, consultas_agendadas) {
        exibir("Pacientes:");
        const pacientes_ordenados = Object.values(pacientes).sort((a, b) => {
            const a_formatted =
                order === cpf ? parseInt(a.cpf) : a[order].toLowerCase();
            const b_formatted =
                order === cpf ? parseInt(b.cpf) : b[order].toLowerCase();
            return a_formatted.localeCompare(b_formatted);
        });
        exibir("-----------------------------------------------------------");
        exibir("CPF         Nome                              Dt.Nasc.  Idade");
        exibir("-----------------------------------------------------------");
        pacientes_ordenados.forEach((paciente) => {
            const data = DateTime.fromString(paciente.data_nascimento, "yyyy-MM-dd");
            const data_nascimento = data.toFormat("dd/MM/yyyy");
            const idade = Math.round(DateTime.now().diff(data, "years").toObject().years)
            exibir(
                `${paciente.cpf} ${paciente.nome.padEnd(33, " ")} ${data_nascimento} ${idade}`
            );

            const consultas_paciente = consultas_agendadas?.[paciente.cpf];
            if (!consultas_paciente || consultas_paciente.length === 0) return;
            const ultima_consulta =
                consultas_paciente[consultas_paciente.length - 1];
            if (ultima_consulta.is_future) {
                exibir(
                    `            Agendado para ${ultima_consulta.data_formatada}`
                );
                exibir(
                    `            ${ultima_consulta.horario_inicial_formatado} às ${ultima_consulta.horario_final_formatado}`
                );
            }
        });
        exibir("-----------------------------------------------------------");
    }

    async listar_agenda(consultas) {
        const consultas_ordenadas = consultas.sort((a, b) => {
            const a_formatted = a.data_com_duracao;
            const b_formatted = b.data_com_duracao;
            return a_formatted.localeCompare(b_formatted);
        });
        exibir("Consultas:");
        exibir(
            "------------------------------------------------------------------------"
        );
        exibir(
            "Data      H.Ini H.Fim Tempo Nome                       Dt.Nasc. "
        );
        consultas_ordenadas.forEach(
            ({ initial_date, final_date, paciente }, index) => {
                const data_f = data_formatada(initial_date);
                const horario_inicial_formatado =
                    horario_formatado(initial_date);
                const horario_final_formatado = horario_formatado(final_date);

                const duracao = DateTime.fromJSDate(final_date)
                    .diff(initial_date, ["hours", "minutes"])
                    .toObject();
                const data =
                    index !== 0 &&
                    data_f === data_formatada(consultas[index - 1].date)
                        ? "".padStart(10, " ")
                        : data_formatada;

                exibir(
                    `${data} ${horario_inicial_formatado} ${horario_final_formatado}  ${tempo_formatado(duracao)} ${paciente.nome.padEnd(24, " ")} ${data_formatada(paciente.data_nascimento)}`
                );
            }
        );
        exibir(
            "------------------------------------------------------------------------"
        );
    }
}

export default ConsultorioView;
