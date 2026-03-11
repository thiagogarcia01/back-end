const botao = document.getElementById("buscar")
const container = document.getElementById("container")

botao.addEventListener("click", buscarPersonagens)

function buscarPersonagens(){

// FAÇA O TESTE SEM A API E DEPOIS TIRE O COMENTARIO DA LINHA ABAIXO
//const url = "https://rickandmortyapi.com/api/character"


fetch(url)

.then(res => {

if(!res.ok){

throw new Error("Erro ao acessar API")

}

return res.json()

})

.then(data => {

console.log(data)

data.results.forEach(personagem => {

container.innerHTML += `

<div class="card">

<img src="${personagem.image}">

<h3>${personagem.name}</h3>

<p>Status: ${personagem.status}</p>

</div>

`

})

})

.catch(erro => {

console.log("Erro detectado:", erro)

container.innerHTML = `
<p style="color:red; font-size:20px;">
Erro ao carregar personagens. Verifique o link da API.
</p>
`

})
}

