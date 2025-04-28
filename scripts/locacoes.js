let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    
    // Elementos DOM
    const formLocacao = document.querySelector('#cadastro form');
    const modal = document.getElementById('cadastro');
    const mainContent = document.querySelector('main') || document.createElement('main');
    
    // Cria a tabela se não existir
    if (!document.querySelector('.tabela-locacoes')) {
        document.body.insertBefore(mainContent, document.querySelector('footer'));
        mainContent.innerHTML = `
            <table class="tabela-locacoes">
                <thead>
                    <tr>
                        <th>Livro</th>
                        <th>Leitor</th>
                        <th>CPF</th>
                        <th>Retirada</th>
                        <th>Devolução</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="corpo-tabela">
                    
                </tbody>
            </table>
        `;
    }

    function formatarCPF(cpf) {
        return cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function formatarData(dataString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dataString).toLocaleDateString('pt-BR', options);
    }

    function carregarLocacoes() {
        const corpoTabela = document.getElementById('corpo-tabela');
        corpoTabela.innerHTML = '';
        
        locacoes.forEach((locacao, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${locacao.livro}</td>
                <td>${locacao.leitor}</td>
                <td>${formatarCPF(locacao.cpf)}</td>
                <td>${formatarData(locacao.retirada)}</td>
                <td>${formatarData(locacao.devolucao)}</td>
                <td>
                    <button onclick="devolverLivro(${index})" class="btn-devolver">Devolver</button>
                </td>
            `;
            corpoTabela.appendChild(row);
        });
    }

    // Função para devolver livro
    window.devolverLivro = function(index) {
        if (confirm('Confirmar devolução deste livro?')) {
            locacoes.splice(index, 1);
            localStorage.setItem('locacoes', JSON.stringify(locacoes));
            carregarLocacoes();
        }
    };

    // Função para filtrar locações
    function filtrarLocacoes() {
        const termo = document.querySelector('.search-input').value.toLowerCase();
        const corpoTabela = document.getElementById('corpo-tabela');
        const linhas = corpoTabela.getElementsByTagName('tr');
        
        for (let linha of linhas) {
            const textoLinha = linha.textContent.toLowerCase();
            linha.style.display = textoLinha.includes(termo) ? '' : 'none';
        }
    }

    // Evento de submit do formulário
    formLocacao.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valida CPF (11 dígitos)
        const cpf = this.elements.cpf.value;
        if (cpf.toString().length !== 11) {
            alert('CPF deve conter 11 dígitos');
            return;
        }
        
        // Cria nova locação
        const novaLocacao = {
            livro: this.elements.livro.value,
            leitor: this.elements.leitor.value,
            cpf: cpf,
            retirada: this.elements.retirada.value,
            devolucao: this.elements.devolução.value
        };
        
        // Adiciona ao array e salva no localStorage
        locacoes.push(novaLocacao);
        localStorage.setItem('locacoes', JSON.stringify(locacoes));
        
        // Atualiza a tabela e fecha o modal
        carregarLocacoes();
        modal.classList.add('oculta');
        this.reset();
    });

    // Adiciona evento ao botão filtrar
    document.querySelector('.search-btn').addEventListener('click', filtrarLocacoes);
    
    // Carrega as locações ao abrir a página
    document.addEventListener('DOMContentLoaded', carregarLocacoes);
