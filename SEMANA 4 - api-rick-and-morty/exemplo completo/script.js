/*
=========================================
PROJETO: API Rick and Morty
=========================================

API utilizada:
https://rickandmortyapi.com/api/character

=========================================
*/


// ELEMENTOS DA INTERFACE

const botaoCarregar = document.getElementById("carregar")
const container = document.getElementById("container")
const buscaInput = document.getElementById("busca")
const filtroStatus = document.getElementById("filtroStatus")
const loading = document.getElementById("loading")



// ARRAY GLOBAL COM PERSONAGENS

let todosPersonagens = []



// EVENTOS

botaoCarregar.addEventListener("click", carregarPersonagens)

buscaInput.addEventListener("input", filtrarPersonagens)

filtroStatus.addEventListener("change", filtrarPersonagens)





// =================================
// FUNÇÃO QUE BUSCA PERSONAGENS
// =================================

async function carregarPersonagens(){

mostrarLoading()

let pagina = 1
let continuar = true

todosPersonagens = []


while(continuar){

const url = `https://rickandmortyapi.com/api/character?page=${pagina}`

try{

const resposta = await fetch(url)

const dados = await resposta.json()

// adiciona personagens no array
todosPersonagens = todosPersonagens.concat(dados.results)

// verifica se existe próxima página

if(dados.info.next){

pagina++

}else{

continuar = false

}

}catch(erro){

console.error("Erro na API", erro)

continuar = false

}

}

esconderLoading()

mostrarPersonagens(todosPersonagens)

}





// =================================
// MOSTRAR PERSONAGENS NA TELA
// =================================

function mostrarPersonagens(lista){

container.innerHTML = ""

lista.forEach(personagem => {

const card = document.createElement("div")

card.classList.add("card")

// define cor da borda pelo status

if(personagem.status === "Alive"){

card.classList.add("status-alive")

}else if(personagem.status === "Dead"){

card.classList.add("status-dead")

}else{

card.classList.add("status-unknown")

}


card.innerHTML = `

<img src="${personagem.image}">

<h3>${personagem.name}</h3>

<p>Status: ${personagem.status}</p>

<p>Espécie: ${personagem.species}</p>

<p>Origem: ${personagem.origin.name}</p>

`

container.appendChild(card)

})

}





// =================================
// FILTRO E BUSCA
// =================================

function filtrarPersonagens(){

const textoBusca = buscaInput.value.toLowerCase()

const statusSelecionado = filtroStatus.value

let filtrados = todosPersonagens.filter(personagem => {

const nomeMatch = personagem.name.toLowerCase().includes(textoBusca)

const statusMatch = statusSelecionado === "all" || personagem.status === statusSelecionado

return nomeMatch && statusMatch

})

mostrarPersonagens(filtrados)

}





// =================================
// CONTROLE DO LOADING
// =================================

function mostrarLoading(){

loading.classList.remove("hidden")

}

function esconderLoading(){

loading.classList.add("hidden")

}