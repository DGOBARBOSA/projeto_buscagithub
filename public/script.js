
function main(){
    const user = document.getElementById('busca').value
    //` -> template string
        const url = (`https://api.github.com/users/${user}/repos`)
    // console.log(url);
    fetch(url).then(response => {
        return response.json()
    }).then(response => {

    // testes no retorno do fetch
    // const teste = response[0].full_name
    //  console.log(response[0].full_name)
    // document.querySelector('.listRepos').innerHTML = `<p>Curso: ${teste}</p>`

    // Limpa a tela antes da busca
        clear()
    // Chama a função que estrutura os repositorios
        renderUserInfos()
        listaRepos(response)    

    })

}

// criacção da query dos repositorios
function listaRepos(response){
    for (let i in response){
        const repos = document.querySelector('.listRepos')
        const nameRepo = response[i].name
        const imgUrl = response[i].language
        const linkRepo = response[i].html_url

//Cria a div dos repositorios
        const repo = `
            <div class="repo">
                <div>
                    <h3 class="title-repo">${nameRepo}</h3>
                    <a class="link-repo" target="_blank" href="${linkRepo}">Ir para o repositório</a>
                </div>   
                <img src="images/${imgUrl}.png" class="lang" width="80"> 
            </div>  
        `
        repos.innerHTML += repo    
    }
}

// Renderizando as informações do profile do usuario

function renderUserInfos(){
    const user = document.getElementById("busca").value

    fetch(`https://api.github.com/users/${user}/repos`).then(response => {
        return response.json()
    }).then(response => {
    // busca a classe user para montar as informações
        const content = document.querySelector('.user')
        const avatarUrl = response[0].owner.avatar_url
        const nameUser = response[0].owner.login
        const reposCount = response.length

    // montando o resultado para html
        content.innerHTML = `<img src="${avatarUrl}"><h1>${nameUser}</h1><p>Total de: ${reposCount} Repositórios</p>`

    })

}
// limpando o usuario e o repos 
function clear(){
    const user = document.querySelector('.user')
    const repos = document.querySelector('.listRepos')

    user.innerHTML = ""
    repos.innerHTML = ""

}