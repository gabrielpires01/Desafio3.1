import { DateTime } from "luxon";
import { alertar } from "./view.js";

function validar_dv(cpf, dv) {
    let soma = 0;
    const digitos = dv === 1 ? 9 : 10;
    for (let i = 0; i < digitos; i++) {
        soma += parseInt(cpf[i]) * (digitos + 1 - i);
    }
    let resto = soma % 11;
    if (resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }
    return resto;
}

function validar_cpf(cpf) {
    if (cpf.length !== 11) {
        alertar("CPF deve conter 11 digitos");
        return false;
    }
    if (cpf.split("").every((digito) => digito === cpf[0])) {
        alertar("CPF inválido");
        return false;
    }

    let primeiroDigito = validar_dv(cpf, 1);
    let segundoDigito = validar_dv(cpf, 2);
    if (
        primeiroDigito !== parseInt(cpf[9]) ||
        segundoDigito !== parseInt(cpf[10])
    ) {
        alertar("CPF inválido");
        return false;
    }
    return true;
}

function validar_nome(nome) {
    if (nome.length < 5) {
        alertar("Nome deve conter pelo menos 5 caracteres");
        return false;
    }
    return true;
}

function validar_data_nascimento(data) {
    if (!data.isValid) {
        alertar("Data inválida");
        return false;
    }
    if (DateTime.now().diff(data, "years").toObject().years < 13) {
        alertar("Paciente deve ter pelo menos 13 anos");
        return false;
    }
    return true;
}

export {
    validar_cpf,
    validar_nome,
    validar_data_nascimento,
};
