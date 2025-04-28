async function carregarLivros() {
    try {
        const response = await fetch('../assets/dados.json');
        if (!response.ok) throw new Error('Erro ao carregar os dados');
        
        const livros = await response.json();
        const container = document.createElement('div');
        container.id = 'container-livros';

        livros.forEach(livro => {
            container.innerHTML += `
                <div class="livro">
                    <img src="${livro.imagem}" alt="${livro.titulo}" style="width:100%; border-radius: 5px;">
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor} (${livro.ano})</p>
                    <p><strong>Gênero:</strong> ${livro.genero}</p>
                    <p>${livro.descricao}</p>
                    <hr>
                </div>
            `;
        });

        document.body.insertBefore(container, document.querySelector('footer'));

    } catch (error) {
        console.error('Falha:', error);
        alert('Erro ao carregar os livros. Verifique o console.');
    }
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '../styles/home.css';
document.head.appendChild(link);

// Executa quando a página carregar
window.addEventListener('DOMContentLoaded', carregarLivros);