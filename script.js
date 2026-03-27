const painel = document.getElementById('container-personagens');
const avisoCarregando = document.getElementById('carregando');

async function carregarDados() {
    try {
        const resposta = await fetch('https://rickandmortyapi.com/api/character');
        
        if (!resposta.ok) {
            throw new Error('Falha na requisição');
        }

        const dados = await resposta.json();
        renderizarTela(dados.results);

    } catch (erro) {
        avisoCarregando.innerText = 'Não foi possível carregar os dados no momento.';
        console.error(erro);
    }
}

function renderizarTela(listaPersonagens) {
    avisoCarregando.style.display = 'none';

    listaPersonagens.forEach(personagem => {
        const item = document.createElement('div');
        item.classList.add('cartao');

        item.innerHTML = `
            <img src="${personagem.image}" alt="${personagem.name}">
            <div class="info-cartao">
                <h2>${personagem.name}</h2>
                <div class="status">
                    <span class="icone-status ${personagem.status}"></span>
                    <span>${personagem.status} - ${personagem.species}</span>
                </div>
                <p class="subtitulo">Última localização:</p>
                <p class="local">${personagem.location.name}</p>
            </div>
        `;

        painel.appendChild(item);
    });
}

carregarDados();