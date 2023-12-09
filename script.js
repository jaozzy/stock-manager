// Objeto Estoque
let Estoque = {

    produtos: new Set(),

    adicionarProduto: function () {

        // Coleta as informações dos produtos inseridas nos inputs da página
        let nomeProduto = document.getElementById('nome-produto').value;
        let precoProduto = document.getElementById('preco-produto').value;
        let quantidadeProduto = document.getElementById('quantidade-produto').value;
        let descricaoProduto = document.getElementById('descricao-produto').value;

        // Verifica se as informações foram inseridas corretamente antes de cadastrar o produto
        if (!validarInputs()) {
            return
        } else {
            // Verifica se o produto já existe no estoque
            for (let produto of this.produtos) {
                if (produto.nome === nomeProduto) {
                    nomeProduto.value = '';
                    precoProduto.value = '';
                    quantidadeProduto.value = '';
                    descricaoProduto.value = '';
                    // Popup de erro com o framework SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'O produto já existe no estoque.',
                        confirmButtonColor: '#6495ed'
                    });
                    return;
                }
            }

            // Define os dados do novo produto
            let novoProduto = {
                nome: nomeProduto,
                preco: precoProduto,
                quantidade: quantidadeProduto,
                descricao: descricaoProduto
            };

            // Adiciona o produto ao estoque
            this.produtos.add(novoProduto);
            // Popup de sucesso com o framework SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Item adicionado ao estoque com sucesso.',
                confirmButtonColor: '#6495ed'
            });

        }
    },

    listarProdutos: function () {
        const tabela = document.getElementById('tabelaProdutos');
        const tbody = tabela.querySelector('tbody');

        console.log("Quantidade de produtos:", this.produtos.size);

        if (this.produtos.size === 0) {
            console.log("Não há produtos no estoque.");
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não há nenhum produto no estoque.',
                confirmButtonColor: '#6495ed'
            });
        } else {

            // Limpar tabela antes de exibir os produtos novamente
            tbody.innerHTML = '';

            // Iterar sobre cada produto no estoque
            this.produtos.forEach(produto => {

                // Criar uma nova linha na tabela
                const newRow = document.createElement('tr');

                // Adicionar os dados do produto na nova linha
                newRow.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.descricao}</td>
            `;

                // Adicionar a nova linha ao corpo da tabela
                tbody.appendChild(newRow);
            });

            // Exibir a tabela
            tabela.style.display = 'table';
        }
    },

    buscarProduto: function () {
        let nomeBuscado = document.getElementById('nome-busca').value;
        let tabela = document.getElementById('tabelaProdutoBusca');
        let tbody = tabela.querySelector('tbody');
        tbody.innerHTML = '';

        let produtosEncontrados = Array.from(this.produtos).filter(produto => produto.nome === nomeBuscado);

        if (produtosEncontrados.length === 0) {
            nomeBuscado.value = '';
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Nenhum produto encontrado com o nome buscado.',
                confirmButtonColor: '#6495ed'
            });
        } else {
            produtosEncontrados.forEach(produto => {
                let newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.descricao}</td>
                `;
                tbody.appendChild(newRow);
            });

            tabela.style.display = 'table';
        }
    },

    atualizarProduto: function () {
        let nomeBuscado = document.getElementById('nome-busca').value.trim();
        let novosDadosDiv = document.getElementById('novos-dados');
        let novoNomeInput = document.getElementById('novo-nome-produto');
        let novoPrecoInput = document.getElementById('novo-preco-produto');
        let novaQuantidadeInput = document.getElementById('nova-quantidade-produto');
        let novaDescricaoInput = document.getElementById('nova-descricao-produto');

        // Busca o produto pelo nome
        let produtoEncontrado = Array.from(this.produtos).find(produto => produto.nome.toLowerCase() === nomeBuscado.toLowerCase());

        if (!produtoEncontrado) {
            nomeBuscado.value = '';
            novoNomeInput.value = '';
            novoPrecoInput.value = '';
            novaQuantidadeInput.value = '';
            novaDescricaoInput.value = '';
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Produto não encontrado.',
                confirmButtonColor: '#6495ed'
            });
            novosDadosDiv.style.display = 'none';
        } else {
            novosDadosDiv.style.display = 'block';

            // Preenche os inputs com os dados do produto encontrado
            novoNomeInput.value = produtoEncontrado.nome;
            novoPrecoInput.value = produtoEncontrado.preco;
            novaQuantidadeInput.value = produtoEncontrado.quantidade;
            novaDescricaoInput.value = produtoEncontrado.descricao;

            // Atualiza os dados do produto se novos dados foram fornecidos
            document.getElementById('atualizar-button').onclick = function () {
                let novoNome = novoNomeInput.value.trim();
                let novoPreco = novoPrecoInput.value.trim();
                let novaQuantidade = novaQuantidadeInput.value.trim();
                let novaDescricao = novaDescricaoInput.value.trim();

                if (novoNome === '' && novoPreco === '' && novaQuantidade === '' && novaDescricao === '') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Aviso',
                        text: 'Preencha pelo menos um campo para atualizar os dados do produto.',
                        confirmButtonColor: '#6495ed'
                    });
                } else {
                    if (novoNome !== '') {
                        produtoEncontrado.nome = novoNome;
                    }
                    if (novoPreco !== '') {
                        produtoEncontrado.preco = novoPreco;
                    }
                    if (novaQuantidade !== '') {
                        produtoEncontrado.quantidade = novaQuantidade;
                    }
                    if (novaDescricao !== '') {
                        produtoEncontrado.descricao = novaDescricao;
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso',
                        text: 'Dados do produto atualizados com sucesso.',
                        confirmButtonColor: '#6495ed'
                    });
                }
            };

        };
    },

    gerarRelatorio: function () {
        let tabelaRelatorio = document.getElementById('relatorio-estoque');
        let tbody = tabelaRelatorio.querySelector('tbody');
        let table = tabelaRelatorio.querySelector('table');

        let numeroProdutos = this.produtos.size;
        let valorTotal = 0;
        let totalQuantidade = 0;

        if (numeroProdutos === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não há nenhum produto no estoque para gerar o relatório.',
                confirmButtonColor: '#6495ed'
            });
            table.style.display = 'none';
        } else {
            this.produtos.forEach(produto => {
                valorTotal += parseFloat(produto.preco) * parseInt(produto.quantidade);
                totalQuantidade += parseInt(produto.quantidade);
            });

            let mediaValorPorProduto = valorTotal / totalQuantidade;

            tbody.innerHTML = `
                <tr>
                    <td>${numeroProdutos}</td>
                    <td>${valorTotal.toFixed(2)}</td>
                    <td>${mediaValorPorProduto.toFixed(2)}</td>
                </tr>
            `;
            table.style.display = 'table';
        }
    }

}

// Método para mostrar os campos referentes à opção de ação escolhida pelo usuário
function mostrarOpcaoSelecionada() {
    const select = document.getElementById('options');
    const opcaoSelecionada = select.value;

    const elementosOpcoes = [
        'adicionar-produto',
        'listar-produtos',
        'buscar-produto',
        'autalizar-produto',
        'relatorio-estoque'
    ];

    elementosOpcoes.forEach(elementoId => {
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.style.display = elementoId === opcaoSelecionada ? 'block' : 'none';
        }
    });
}

// Método para verificar se o formulário de criação ou atualização de produto foi totalmente preenchido
function validarInputs() {
    const criarProduto = document.getElementById('adicionar-produto');
    const atualizarProduto = document.getElementById('autalizar-produto');

    if (criarProduto.style.display !== 'none') {
        const nome = document.getElementById('nome-produto').value;
        const preco = document.getElementById('preco-produto').value;
        const quantidade = document.getElementById('quantidade-produto').value;
        const descricao = document.getElementById('descricao-produto').value;

        if (nome === '' || preco === '' || preco <= 0 || quantidade === '' || quantidade <= 0 || descricao === '') {
            Swal.fire({
                icon: 'error',
                title: 'Preenchimento incorreto!',
                text: 'Preencha todos os campos corretamente.',
                confirmButtonColor: '#6495ed'
            }).then(() => {
                // Limpa os campos se houver erro de preenchimento
                document.getElementById('nome-produto').value = '';
                document.getElementById('preco-produto').value = '';
                document.getElementById('quantidade-produto').value = '';
                document.getElementById('descricao-produto').value = '';
            });
            return false;
        }
    }

    if (atualizarProduto.style.display !== 'none') {
        const novoNome = document.getElementById('novo-nome-produto').value;
        const novoPreco = document.getElementById('novo-preco-produto').value;
        const novaQuantidade = document.getElementById('nova-quantidade-produto').value;
        const novaDescricao = document.getElementById('nova-descricao-produto').value;

        if (novoNome === '' || novoPreco === '' || novoPreco <= 0 || novaQuantidade === '' || novaQuantidade <= 0 || novaDescricao === '') {
            Swal.fire({
                icon: 'error',
                title: 'Preenchimento incorreto!',
                text: 'Preencha todos os campos corretamente.',
                confirmButtonColor: '#6495ed'
            }).then(() => {
                // Limpa os campos se houver erro de preenchimento
                document.getElementById('novo-nome-produto').value = '';
                document.getElementById('novo-preco-produto').value = '';
                document.getElementById('nova-quantidade-produto').value = '';
                document.getElementById('nova-descricao-produto').value = '';
            });
            return false;
        }
    }

    return true;
}