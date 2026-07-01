const connection = require('../database/connection');

async function listarPorAdministrador(idAdministrador) {
    const [produtos] = await connection.query(
        `SELECT id, nome, quantidade, preco_compra, preco_venda, departamento
         FROM produtos
         WHERE id_administrador = ?`,
        [idAdministrador]
    );

    return produtos;
}

async function cadastrar(produto, idAdministrador) {
    await connection.query(
        `INSERT INTO produtos
        (nome, quantidade, preco_compra, preco_venda, departamento, id_administrador)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            produto.nome,
            produto.quantidade,
            produto.precoCompra,
            produto.precoVenda,
            produto.departamento,
            idAdministrador
        ]
    );
}

async function buscarPorId(id) {
    const [produtos] = await connection.query(
        `SELECT nome, quantidade, preco_compra
         FROM produtos
         WHERE id = ?`,
        [id]
    );

    return produtos[0];
}

async function atualizarQuantidade(id, quantidade) {
    await connection.query(
        `UPDATE produtos
         SET quantidade = ?
         WHERE id = ?`,
        [quantidade, id]
    );
}

async function remover(id) {
    await connection.query(
        `DELETE FROM produtos
         WHERE id = ?`,
        [id]
    );
}

async function editar(id, produto) {
    await connection.query(
        `UPDATE produtos
         SET nome = ?, quantidade = ?, preco_compra = ?, preco_venda = ?, departamento = ?
         WHERE id = ?`,
        [
            produto.nome,
            produto.quantidade,
            produto.precoCompra,
            produto.precoVenda,
            produto.departamento,
            id
        ]
    );
}

module.exports = {
    listarPorAdministrador,
    cadastrar,
    buscarPorId,
    atualizarQuantidade,
    remover,
    editar
};
