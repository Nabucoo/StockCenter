const Produto = require('../models/Produto');
const produtosRepository = require('../repository/produtosRepository');
const movimentacoesRepository = require('../repository/movimentacoesRepository');
const ServiceError = require('./ServiceError');

function getIdDono(usuario) {
    return usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
}

function validarProduto({ nome, quantidade, precoCompra, precoVenda }) {
    if (!nome || nome.trim() === "") {
        throw new ServiceError(400, "O nome do produto é obrigatório.");
    }

    if (quantidade < 0) {
        throw new ServiceError(400, "A quantidade não pode ser negativa.");
    }

    if (precoCompra < 0 || precoVenda < 0) {
        throw new ServiceError(400, "Os preços de compra e venda não podem ser valores negativos.");
    }

    if (Number(precoVenda) < Number(precoCompra)) {
        throw new ServiceError(400, "O preço de venda não pode ser menor que o preço de compra.");
    }
}

async function listar(usuario) {
    const idDono = getIdDono(usuario);
    return produtosRepository.listarPorAdministrador(idDono);
}

async function cadastrar(dados, usuario) {
    validarProduto(dados);

    const produto = new Produto(
        dados.nome,
        dados.quantidade,
        dados.precoCompra,
        dados.precoVenda,
        dados.departamento
    );
    const idDono = getIdDono(usuario);

    await produtosRepository.cadastrar(produto, idDono);
    await movimentacoesRepository.cadastrar({
        idFuncionario: usuario.id,
        idAdministrador: idDono,
        produto: produto.nome,
        quantidade: produto.quantidade,
        valorTotal: produto.quantidade * produto.precoCompra,
        tipo: "entrada"
    });

    return "Produto criado com sucesso!";
}

async function remover(id, quantidade, usuario) {
    const quantidadeRemovida = Number(quantidade);

    if (quantidadeRemovida <= 0) {
        throw new ServiceError(400, "Quantidade inválida!");
    }

    const produto = await produtosRepository.buscarPorId(id);

    if (!produto) {
        throw new ServiceError(404, "Produto não encontrado.");
    }

    if (quantidadeRemovida > produto.quantidade) {
        throw new ServiceError(400, "Quantidade inválida.");
    }

    if (quantidadeRemovida < produto.quantidade) {
        await produtosRepository.atualizarQuantidade(id, produto.quantidade - quantidadeRemovida);
    } else {
        await produtosRepository.remover(id);
    }

    const idDono = getIdDono(usuario);

    await movimentacoesRepository.cadastrar({
        idFuncionario: usuario.id,
        idAdministrador: idDono,
        produto: produto.nome,
        quantidade: quantidadeRemovida,
        valorTotal: quantidadeRemovida * produto.preco_compra,
        tipo: "saida"
    });

    return "Produto removido com sucesso!";
}

async function editar(id, dados) {
    const produto = new Produto(
        dados.novoNome,
        dados.novaQuantidade,
        dados.novoPrecoCompra,
        dados.novoPrecoVenda,
        dados.novoDepartamento
    );

    validarProduto({
        nome: produto.nome,
        quantidade: produto.quantidade,
        precoCompra: produto.precoCompra,
        precoVenda: produto.precoVenda
    });

    await produtosRepository.editar(id, produto);

    return "Produto atualizado com sucesso!";
}

module.exports = {
    listar,
    cadastrar,
    remover,
    editar
};
