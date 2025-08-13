const input = document.querySelector('.input-tarefa')
const botao = document.querySelector('.botao')
const listaHtml = document.querySelector('.lista')



let ListaCompleta = []


function AdicionarNovaTarefa() {
    ListaCompleta.push({
        tarefa: input.value,
        concluida: false
    })
    input.value = ''
    MostrarTarefas()
}

function MostrarTarefas() {
    let NovoItemLista = ''
    ListaCompleta.forEach((item, posicao) => {
        NovoItemLista = NovoItemLista + `
        <li class="item-lista ${item.concluida && "concluida"}">
                <img class="icone"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/love2d/love2d-plain.svg" onclick="concluirTarefa(${posicao})" />
                <p class="texto-lista">${item.tarefa}</p>
                <button class="botao-remover"><img class="icone-lixeira" src="imgs/bin-svgrepo-com.svg" alt="imagem-lixeira" onclick="deletarTarefa(${posicao})"></button>
            </li>
        `
    })


    listaHtml.innerHTML = NovoItemLista

    localStorage.setItem('Lista', JSON.stringify(ListaCompleta))
}

function concluirTarefa(posicao) {
    ListaCompleta[posicao].concluida = !ListaCompleta[posicao].concluida
    MostrarTarefas()
}

function deletarTarefa(posicao) {
    ListaCompleta.splice(posicao, 1)
    MostrarTarefas()
}

function RecarregarTela() {
    const listaStorage = localStorage.getItem('Lista')

    if (listaStorage) {
        ListaCompleta = JSON.parse(listaStorage)
    }

    MostrarTarefas()

}

RecarregarTela()

botao.addEventListener('click', () => {
    if (input.value.trim() === "") { // trim() remove espaços em branco
        alert('Digite algo antes de adicionar!');
        return;
    }
    AdicionarNovaTarefa();
});