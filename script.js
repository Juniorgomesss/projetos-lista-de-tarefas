let tarefas = []

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById("mensagem")

    if (tarefa == "") {
        let mensagemErro = "Digite uma tarefa para adiciona-la a sua lista!"
        mensagem.textContent = mensagemErro
    } else {
        let mensagemSucesso = "Tarefa adicionada com sucesso!"
        mensagem.textContent = mensagemSucesso
        tarefas.push(tarefa)
        renderizarTarefas()
     }

    inputTarefa.value = ""
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""

    for (let i = 0; i < tarefas.length; i++) {
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]
         
        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar =  document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarTarefa(i)

        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        listaTarefas.appendChild(novaTarefa)
    }
    atualizarVisibilidadeBotaoLimpar();
}

function removerTarefa(i) {
    tarefas.splice(i, 1)
    renderizarTarefas()
}

function editarTarefa(i) {
    let tarefaEditada = prompt("Edite a tarefa:")
    if (tarefaEditada.trim() !== "") {
        tarefas [i] = tarefaEditada
        renderizarTarefas ()
    }
}

function limparLista () {
    tarefas.length = 0
    renderizarTarefas()
    const mensagem = document.getElementById("mensagem")
    mensagem.textContent = "Lista de tarefas limpa com sucesso!"
}

function atualizarVisibilidadeBotaoLimpar () {
    const botaoLimpar = document.querySelector (".botao_lista");
    if (tarefas.length > 0) {
        botaoLimpar.classList.remove("hidden");
    } else {
            botaoLimpar.classList.add("hidden");
        }
    }

//criar tarefas com a tecla enter

// Seleciona o campo de input da tarefa pelo seu ID
const inputTarefa = document.getElementById("inputTarefa");

// Adiciona um "ouvinte" que espera por uma tecla ser pressionada
inputTarefa.addEventListener("keydown", function(event) {
    if (event.key ==="Enter") {
        adicionarTarefa();
    }
});
