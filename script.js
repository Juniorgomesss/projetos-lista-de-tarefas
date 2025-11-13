// ATUALIZADO: Carrega as tarefas salvas do localStorage ou inicia um array vazio
let tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

// NOVO: Uma função para salvar as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    let tarefa = inputTarefa.value.trim();

    const mensagem = document.getElementById("mensagem");

    if (tarefa == "") {
        let mensagemErro = "Digite uma tarefa para adiciona-la a sua lista!";
        mensagem.textContent = mensagemErro;
    } else {
        let mensagemSucesso = "Tarefa adicionada com sucesso!";
        mensagem.textContent = mensagemSucesso;
        tarefas.push(tarefa);
        salvarTarefas(); // NOVO: Salva após adicionar
        renderizarTarefas();
     }

    inputTarefa.value = "";
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        let novaTarefa = document.createElement("li");
        novaTarefa.textContent = tarefas[i];
         
        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover";
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerTarefa(i);

        let botaoEditar =  document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarTarefa(i);

        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoEditar);
        listaTarefas.appendChild(novaTarefa);
    }
    atualizarVisibilidadeBotaoLimpar();
}

function removerTarefa(i) {
    tarefas.splice(i, 1);
    salvarTarefas(); // NOVO: Salva após remover
    renderizarTarefas();
}

function editarTarefa(i) {
    let tarefaEditada = prompt("Edite a tarefa:");
    
    // ATUALIZADO: Verificação para garantir que o usuário não clicou em "Cancelar" (null)
    if (tarefaEditada !== null && tarefaEditada.trim() !== "") {
        tarefas[i] = tarefaEditada.trim();
        salvarTarefas(); // NOVO: Salva após editar
        renderizarTarefas();
    } else if (tarefaEditada !== null && tarefaEditada.trim() === "") {
        alert("A tarefa não pode ficar vazia!");
    }
}

function limparLista() {
    tarefas.length = 0; // Isso é o mesmo que tarefas = []
    salvarTarefas(); // NOVO: Salva após limpar
    renderizarTarefas();
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Lista de tarefas limpa com sucesso!";
}

function atualizarVisibilidadeBotaoLimpar() {
    const botaoLimpar = document.querySelector (".botao_lista");
    if (tarefas.length > 0) {
        botaoLimpar.classList.remove("hidden");
    } else {
        botaoLimpar.classList.add("hidden");
    }
}

//--- Tecla Enter ---//
const inputTarefa = document.getElementById("inputTarefa");

inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// NOVO: Renderiza as tarefas que foram carregadas do localStorage assim que a página abre
renderizarTarefas();
