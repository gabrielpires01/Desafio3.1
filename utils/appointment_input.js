import { DateTime } from "luxon";
import { validar_data_consulta, validar_horario_consulta } from "./appointment_validation.js";
import { pegar_dados } from "./input.js";

function inserir_horario(horario_inicial) {
    let horario = pegar_dados(
        `Horário ${horario_inicial ? "final" : "inicial"} (HH:mm): `
    );
    let horario_formatado = DateTime.fromFormat(horario, "T", {
        locale: "pt-BR",
    });
    while (!validar_horario_consulta(horario_formatado, horario_inicial)) {
        horario = pegar_dados("Horário inicial (HH:mm): ");
        horario_formatado = DateTime.fromFormat(horario, "T", {
            locale: "pt-BR",
        });
    }
    return horario_formatado;
}

function inserir_data(
    mensagem = "Data de consulta: ",
    only_basic = false,
    data_inicial = null
) {
    let data = pegar_dados(mensagem);
    let data_formatada = DateTime.fromFormat(data, "dd/MM/yyyy", {
        locale: "pt-BR",
    });
    while (!validar_data_consulta(data_formatada, only_basic, data_inicial)) {
        data = pegar_dados(mensagem);
        data_formatada = DateTime.fromFormat(data, "dd/MM/yyyy", {
            locale: "pt-BR",
        });
    }
    return data_formatada;
}


export { inserir_horario, inserir_data };
