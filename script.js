// ATENÇÃO: Se tiver tarefas antigas salvas, limpe o localStorage antes de testar!
let tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

function salvarTarefas() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    let textoTarefa = inputTarefa.value.trim();
    const mensagem = document.getElementById("mensagem");

    if (textoTarefa == "") {
        mensagem.textContent = "Digite uma tarefa para adicioná-la à lista!";
    } else {
        mensagem.textContent = "Tarefa adicionada com sucesso!";
        
        // MUDANÇA PRINCIPAL: Agora criamos um OBJETO
        let novaTarefa = {
            texto: textoTarefa,
            concluida: false
        };
        
        tarefas.push(novaTarefa);
        salvarTarefas();
        renderizarTarefas();
     }

    inputTarefa.value = "";
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        let itemLista = document.createElement("li");
        itemLista.className = "item-tarefa"; // Classe para alinhar tudo
        
        // Texto da tarefa
        let spanTexto = document.createElement("span");
        spanTexto.textContent = tarefas[i].texto;
        spanTexto.className = "texto-tarefa";
        
        if (tarefas[i].concluida === true) {
            spanTexto.classList.add("concluida");
        }

        spanTexto.onclick = () => toggleConcluida(i);

        // Div para agrupar os botões
        let divBotoes = document.createElement("div");

        // Botão Remover (Agora com Ícone de Lixeira)
        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover";
        botaoRemover.innerHTML = '<i class="fas fa-trash"></i>'; // <--- MUDANÇA AQUI
        botaoRemover.onclick = () => removerTarefa(i);

        // Botão Editar (Agora com Ícone de Lápis)
        let botaoEditar =  document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.innerHTML = '<i class="fas fa-pen"></i>'; // <--- MUDANÇA AQUI
        botaoEditar.onclick = () => editarTarefa(i);

        divBotoes.appendChild(botaoRemover);
        divBotoes.appendChild(botaoEditar);

        itemLista.appendChild(spanTexto);
        itemLista.appendChild(divBotoes);
        
        listaTarefas.appendChild(itemLista);
    }
    atualizarVisibilidadeBotaoLimpar();
}

// NOVA FUNÇÃO: Muda o status de concluída (true/false)
function toggleConcluida(i) {
    tarefas[i].concluida = !tarefas[i].concluida; // Inverte o valor (se é true vira false, e vice-versa)
    salvarTarefas();
    renderizarTarefas();
}

function removerTarefa(i) {
    tarefas.splice(i, 1);
    salvarTarefas();
    renderizarTarefas();
}

function editarTarefa(i) {
    const listaTarefas = document.getElementById('listaTarefas');
    const itemLista = listaTarefas.children[i];
    
    const textoAtual = tarefas[i].texto;

    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = textoAtual;

    // Botão Salvar (Agora com Ícone de Check/Confirmar)
    const botaoSalvar = document.createElement('button');
    botaoSalvar.className = 'editar'; // Mantém a cor marrom
    botaoSalvar.innerHTML = '<i class="fas fa-check"></i>'; // <--- MUDANÇA AQUI (Ícone de Check)

    botaoSalvar.onclick = function() {
        const novoTexto = inputEdicao.value.trim();

        if (novoTexto !== '') {
            tarefas[i].texto = novoTexto;
            salvarTarefas();
            renderizarTarefas();
        } else {
            alert('A tarefa não pode ficar vazia!');
        }
    };

    itemLista.innerHTML = '';
    itemLista.appendChild(inputEdicao);
    itemLista.appendChild(botaoSalvar);
    
    inputEdicao.focus();
}

function limparLista() {
    tarefas = []; // Reinicia o array
    salvarTarefas();
    renderizarTarefas();
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Lista de tarefas limpa com sucesso!";
}

function atualizarVisibilidadeBotaoLimpar() {
    const botaoLimpar = document.querySelector(".botao_lista");
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

renderizarTarefas();
