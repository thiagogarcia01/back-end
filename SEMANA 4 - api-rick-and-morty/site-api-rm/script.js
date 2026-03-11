// Seleciona o botão da página pelo ID "buscar"
// Esse botão será usado para iniciar a busca na API
const botao = document.getElementById("buscar")

// Seleciona a div onde os personagens serão exibidos
// Essa área funciona como um "container" para os cards
const container = document.getElementById("container")

// Adiciona um evento de clique ao botão
// Quando o usuário clicar, a função buscarPersonagens será executada
botao.addEventListener("click", buscarPersonagens)


// Função responsável por buscar os dados da API
function buscarPersonagens(){

// EXERCÍCIO DA AULA:
// Inicialmente a variável da API está comentada como na linha abaixo.
// Isso fará o código gerar erro ao executar o fetch().
//
// O objetivo é que:
// 1 - Testem o comportamento do erro
// 2 - Observem o console do navegador
// 3 - Depois removam o comentário da linha abaixo
// 4 - Assim a API passará a funcionar corretamente

//TIRAR O COMENTÁRIO DA LINHA ABAIXO
//const url = "https://rickandmortyapi.com/api/character"


// fetch() é usado para fazer uma requisição para uma API
// Nesse caso estamos tentando acessar a URL da API
fetch(url)

.then(res => {

    // Verifica se a resposta da API foi bem sucedida
    // Se não for (por exemplo erro 404 ou problema de conexão),
    // lançamos um erro manual
    if(!res.ok){

        throw new Error("Erro ao acessar API")

    }

    // Converte a resposta da API para formato JSON
    // JSON é o formato padrão de dados usado por APIs
    return res.json()

})

.then(data => {

    // Mostra no console todos os dados recebidos da API
    // Útil para os alunos visualizarem a estrutura da resposta
    console.log(data)

    // A API retorna vários personagens dentro de "results"
    // Vamos percorrer cada personagem usando forEach
    data.results.forEach(personagem => {

        // Para cada personagem criamos um "card" na página
        // innerHTML += adiciona conteúdo dentro da div container
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

    // Se qualquer erro acontecer (API fora do ar, URL incorreta, etc)
    // ele será capturado aqui
    console.log("Erro detectado:", erro)

    // Mostra uma mensagem de erro na página para o usuário
    container.innerHTML = `
    <p style="color:red; font-size:20px;">
    Erro ao carregar personagens. Verifique o link da API.
    </p>
    `

})

}
