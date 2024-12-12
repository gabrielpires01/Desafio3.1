import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });

function pegar_dados(mensagem) {
    return prompt(mensagem);
}

export { pegar_dados };
