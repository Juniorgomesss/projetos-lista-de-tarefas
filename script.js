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
        
        // MUDANÇA PRINCIPAL: Agora cria um OBJETO
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

// Variável global para controlar o filtro atual (começa mostrando tudo)
let filtroAtual = 'todas';

function filtrar(novoFiltro) {
    filtroAtual = novoFiltro; // Atualiza a variável
    
    // Atualiza visualmente os botões (troca a classe .ativo)
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => {
        // Se o texto do botão for igual ao filtro, ele fica ativo
        btn.classList.remove('ativo');
        if (btn.getAttribute('onclick').includes(novoFiltro)) {
            btn.classList.add('ativo');
        }
    });

    renderizarTarefas(); // Redesenha a lista com o novo filtro
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.innerHTML = "";

    // 1. Estado Vazio (Se não tiver NENHUMA tarefa no total)
    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <div class="estado-vazio">
                <i class="fas fa-mug-hot"></i>
                <p>Tudo limpo por aqui! Aproveite seu descanso.</p>
            </div>
        `;
        atualizarVisibilidadeBotaoLimpar();
        return;
    }

    // 2. Loop com Filtro
    for (let i = 0; i < tarefas.length; i++) {
        
        // LÓGICA DE FILTRAGEM:
        // Se o filtro for "pendentes" E a tarefa estiver concluída -> PULA (não desenha)
        if (filtroAtual === 'pendentes' && tarefas[i].concluida === true) {
            continue; 
        }
        // Se o filtro for "concluidas" E a tarefa NÃO estiver concluída -> PULA
        if (filtroAtual === 'concluidas' && tarefas[i].concluida === false) {
            continue;
        }

        // --- Daqui para baixo é o desenho normal da tarefa ---
        let itemLista = document.createElement("li");
        itemLista.className = "item-tarefa"; 
        
        let spanTexto = document.createElement("span");
        spanTexto.textContent = tarefas[i].texto;
        spanTexto.className = "texto-tarefa";
        
        if (tarefas[i].concluida === true) {
            spanTexto.classList.add("concluida");
        }

        spanTexto.onclick = () => toggleConcluida(i);

        let divBotoes = document.createElement("div");

        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover";
        botaoRemover.innerHTML = '<i class="fas fa-trash"></i>';
        botaoRemover.onclick = () => removerTarefa(i);

        let botaoEditar =  document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.innerHTML = '<i class="fas fa-pen"></i>';
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
