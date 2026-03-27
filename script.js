const container = document.getElementById('characters-container');
const loading = document.getElementById('loading');

// Função para buscar os dados
async function fetchCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        
        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data = await response.json();
        renderCards(data.results);
    } catch (error) {
        loading.innerText = '❌ Erro ao carregar os dados. Tente novamente.';
        console.error(error);
    }
}

// Função para desenhar os cards na tela
function renderCards(characters) {
    loading.style.display = 'none'; // Esconde o carregando

    characters.forEach(char => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="card-info">
                <h2>${char.name}</h2>
                <div class="status">
                    <span class="status-icon ${char.status}"></span>
                    <span>${char.status} - ${char.species}</span>
                </div>
                <p style="font-size: 0.8rem; color: #9e9e9e; margin-top: 5px;">Última localização:</p>
                <p style="font-size: 0.9rem;">${char.location.name}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Inicia a aplicação
fetchCharacters();