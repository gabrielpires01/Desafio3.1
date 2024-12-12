import { DateTime } from "luxon";
import { alertar } from "./view.js";

function validar_horario_consulta(horario, hora_inicial) {
    if (!horario.isValid) {
        alertar("Horário inválido");
        return false;
    }
    const hora = horario.hour;
    const minutos = horario.minute;
    if (hora < 8 || hora >= 19) {
        alertar("Horário de funcionamento entre 8h e 19h");
        return false;
    }
    if (hora_inicial) {
        if (
            hora < hora_inicial.hour ||
            (hora === hora_inicial.hour && minutos <= hora_inicial.minute)
        ) {
            alertar("Horário deve ser posterior ao horário inicial");
            return false;
        }
    }
    if (minutos % 15 !== 0) {
        alertar("Horário deve ser em intervalos de 15 minutos");
        return false;
    }
    return true;
}

function validacao_data(data) {
    if (!data.isValid) {
        alertar("Data inválida");
        return false;
    }
    return true;
}

function validar_data_consulta(data, only_basic = false, data_inicial = null) {
    if (!validacao_data(data)) {
        return false;
    }
    if (data_inicial && data < data_inicial) {
        alertar("Data de consulta deve ser posterior a data inicial");
        return false;
    }
    if (only_basic) {
        return true;
    }
    if (data < DateTime.now()) {
        alertar("Data de consulta deve ser posterior a data atual");
        return false;
    }
    return true;
}

export {
    validar_horario_consulta,
    validar_data_consulta,
    validacao_data,
};
