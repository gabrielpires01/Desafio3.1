import { DateTime } from "luxon";

function alertar(mensagem) {
    console.error("Erro: " + mensagem + "\n");
}

function exibir(mensagem) {
    console.log(mensagem);
}

function limpar_tela() {
    console.clear();
}

function data_formatada(data) {
    return DateTime.fromJSDate(data).toFormat("dd/MM/yyyy");
}

function horario_formatado(data) {
    return DateTime.fromJSDate(data).toFormat("HH:mm");
}

function data_duracao_formatada(data, horario_inicial) {
    return DateTime.fromJSDate(data).plus({
        hours: horario_inicial.hour,
        minutes: horario_inicial.minute,
    });
}

function tempo_formatado(duracao) {
    return `${duracao.hours}:${duracao.minutes}`;
}

export {
    alertar,
    exibir,
    limpar_tela,
    data_formatada,
    horario_formatado,
    data_duracao_formatada,
    tempo_formatado,
};
