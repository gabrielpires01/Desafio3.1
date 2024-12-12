import ConsultaService from "../services/consulta.js";
import PacienteService from "../services/paciente.js";
import { inserir_data, inserir_horario } from "../utils/appointment_input.js";
import { inserir_cpf } from "../utils/user_inputs.js";
import { exibir, alertar } from "../utils/view.js";
import ViewConsultorio from "../views/consultorio.js";

class ConsultorioController {
    service_consulta = new ConsultaService();
    service_paciente = new PacienteService();
    view_consultorio = new ViewConsultorio();

    async cadastrar_paciente() {
        await this.service_paciente.new();
        exibir("\nPaciente cadastrado com sucesso!\n");
    }

    async consulta_paciente(paciente_id) {
        const consulta = await this.service_consulta.get_consulta_futura(paciente_id);

        if (consulta) {
            alertar("paciente está agendado");
            return
        }
        return consulta;
    }

    async buscar_consulta_futura(cpf) {
        const paciente = await this.service_paciente.get_paciente(cpf);
        if (!paciente) {
            alertar("Paciente não cadastrado");
            return;
        }

        return await this.consulta_paciente(paciente.id);
    }

    async excluir_paciente() {
        const cpf = inserir_cpf();
        const consulta = await this.buscar_consulta_futura(cpf);
        if (consulta) return;

        await this.service_paciente.delete(cpf);

        exibir("\nPaciente excluído com sucesso!\n");
    }


    async cancelar_consulta() {
        const cpf = inserir_cpf();
        const data = inserir_data("Data da consulta: ", true);
        const horario_inicial = inserir_horario();

        const paciente = await this.service_paciente.get_paciente(cpf);
        if (!paciente) {
            alertar("Paciente não cadastrado");
            return;
        }

        const formatada = this.service_consulta.data_com_duracao(data, horario_inicial);

        const consulta = await this.service_consulta.get_consulta_futura(paciente.id, formatada);
        if (!consulta) {
            alertar("Paciente não possui consulta agendada nesta data");
            return;
        }
        
        const result = this.service_consulta.cancelar(consulta.id);
        if (!result) return;

        exibir("Agendamento cancelado com sucesso!\n");
    }

    async agendar_consulta() {
        const cpf = inserir_cpf();
        const paciente = await this.service_paciente.get_paciente(cpf);
        if (!paciente) {
            return;
        }

        if (!this.consulta_paciente(paciente.id)) return;

        const result = await this.service_consulta.new(paciente.id);
        if (!result) return;

        exibir("Consulta agendada");
    }

    async listar_pacientes(order = "nome") {
        const pacientes = await this.service_paciente.get_pacientes(order);
        this.view_consultorio.listar_pacientes(pacientes);
    }

    async listar_agenda() {
        let data_inicial = inserir_data("Data inicial: ", true);
        let data_final = inserir_data("Data final: ", true, data_inicial);
        const resultado = await this.service_consulta.get_consultas(data_inicial, data_final, true);
        const consultas = resultado.map(consulta => consulta.toJSON());

        this.view_consultorio.listar_agenda(consultas);
    }
}

export default ConsultorioController;
