const connection = require('../database/connection');

async function listarPorAdministrador(idAdministrador) {
    const [movimentacoes] = await connection.query(
        `SELECT
            movimentacoes.*,
            usuarios.nome AS nome_funcionario
         FROM movimentacoes
         LEFT JOIN usuarios
            ON movimentacoes.id_funcionario = usuarios.id
         WHERE movimentacoes.id_administrador = ?`,
        [idAdministrador]
    );

    return movimentacoes;
}

async function filtrarPorPeriodo(idAdministrador, dataInicial, dataFinal) {
    const [movimentacoes] = await connection.query(
        `SELECT
            movimentacoes.*,
            usuarios.nome AS nome_funcionario
         FROM movimentacoes
         LEFT JOIN usuarios
            ON movimentacoes.id_funcionario = usuarios.id
         WHERE movimentacoes.id_administrador = ?
            AND data_criacao BETWEEN ? AND ?`,
        [idAdministrador, dataInicial, `${dataFinal} 23:59:59`]
    );

    return movimentacoes;
}

async function cadastrar(movimentacao) {
    await connection.query(
        `INSERT INTO movimentacoes
        (id_funcionario, id_administrador, produto, quantidade, valor_total, tipo)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            movimentacao.idFuncionario,
            movimentacao.idAdministrador,
            movimentacao.produto,
            movimentacao.quantidade,
            movimentacao.valorTotal,
            movimentacao.tipo
        ]
    );
}

module.exports = {
    listarPorAdministrador,
    filtrarPorPeriodo,
    cadastrar
};
