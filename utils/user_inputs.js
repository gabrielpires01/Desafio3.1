import { DateTime } from "luxon";
import { pegar_dados } from "./input.js";
import {
    validar_cpf,
    validar_data_nascimento,
    validar_nome,
} from "./user_validation.js";

function inserir_cpf() {
    let cpf = pegar_dados("CPF: ");
    while (!validar_cpf(cpf)) {
        cpf = pegar_dados("CPF: ");
    }
    return cpf;
}

function inserir_data_nascimento() {
    let data_nascimento = pegar_dados("Data de Nascimento: ");
    let data = DateTime.fromFormat(data_nascimento, "dd/MM/yyyy", {
        locale: "pt-BR",
    });
    console.log(data);
    while (!validar_data_nascimento(data)) {
        data_nascimento = pegar_dados("Data de Nascimento: ");
        data = DateTime.fromFormat(data_nascimento, "dd/MM/yyyy", {
            locale: "pt-BR",
        });
    }
    return data;
}

function inserir_nome() {
    let nome = pegar_dados("Nome: ");
    while (!validar_nome(nome)) {
        nome = pegar_dados("Nome: ");
    }
    return nome;
}

export { inserir_cpf, inserir_data_nascimento, inserir_nome };
