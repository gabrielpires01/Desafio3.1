import ConsultorioController from "./controllers/consultorio.js";
import db from "./models/index.js";
import { pegar_dados } from "./utils/input.js";
import { alertar, exibir, limpar_tela } from "./utils/view.js";

async function main() {
    const consultorio = new ConsultorioController();
    main_loop: while (true) {
        limpar_tela();
        exibir("Consultório");
        exibir("1 - Cadastro de pacientes");
        exibir("2 - Agenda");
        exibir("3 - Sair");
        const opcao = pegar_dados("Opção: ");
        switch (opcao) {
            case "1":
                await menu_paciente(consultorio);
                break;
            case "2":
                await menu_agenda(consultorio);
                break;
            case "3":
                exibir("Saindo...");
                break main_loop;
            default:
                alertar("Opção inválida");
                break;
        }
    }
}

async function menu_paciente(consultorio) {
    main_loop: while (true) {
        exibir("Paciente");
        exibir("1 - Cadastrar paciente");
        exibir("2 - Excluir paciente");
        exibir("3 - Listar pacientes (ordenado por cpf)");
        exibir("4 - Listar pacientes (ordenado por nome)");
        exibir("5 - Voltar para o menu principal");
        const opcao = pegar_dados("Opção: ");
        switch (opcao) {
            case "1":
                await consultorio.cadastrar_paciente();
                break;
            case "2":
                await consultorio.excluir_paciente();
                break;
            case "3":
                await consultorio.listar_pacientes("cpf");
                break;
            case "4":
                await consultorio.listar_pacientes("nome");
                break;
            case "5":
                exibir("Voltando...");
                break main_loop;
            default:
                alertar("Opção inválida");
                break;
        }
    }
}

async function menu_agenda(consultorio) {
    main_loop: while (true) {
        exibir("Agenda");
        exibir("1 - Cadastrar consulta");
        exibir("2 - Cancelar agendamento");
        exibir("3 - Listar agenda");
        exibir("4 - Voltar para o menu principal");
        const opcao = pegar_dados("Opção: ");
        switch (opcao) {
            case "1":
                await consultorio.agendar_consulta();
                break;
            case "2":
                await consultorio.cancelar_consulta();
                break;
            case "3":
                await consultorio.listar_agenda();
                break;
            case "4":
                exibir("Voltando...");
                break main_loop;
            default:
                alertar("Opção inválida");
                break;
        }
    }
}

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
    await db.sequelize.sync();

    console.log('Modelos sincronizados com sucesso.');
    await main();

  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  } finally {
    await db.sequelize.close();
  }
})();
