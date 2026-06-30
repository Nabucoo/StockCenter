const connection = require('../database/connection');

exports.listar = async(req, res) => {
    const usuario = req.usuario;
    const idDono = usuario.idAdministrador ? usuario.idAdministrador : usuario.id;

    const [movimentacoes] = await connection.query(`
        SELECT
            movimentacoes.*,
            usuarios.nome AS nome_funcionario
        FROM movimentacoes
        LEFT JOIN usuarios
            ON movimentacoes.id_funcionario = usuarios.id
        WHERE movimentacoes.id_administrador = ?
    `, [idDono]);

    return res.status(200).json({
        movimentacoes
    })
}

exports.filtrar = async(req, res) => {
    const usuario = req.usuario;
    const idDono = usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
    const { dataInicial, dataFinal } = req.query;

    if (!dataInicial || !dataFinal) {
        return res.status(400).json({
            mensagem: "Informe a data inicial e a data final."
        });
    }

    const [movimentacoes] = await connection.query(`
        SELECT 
            movimentacoes.*,
            usuarios.nome AS nome_funcionario
        FROM movimentacoes
        LEFT JOIN usuarios
            ON movimentacoes.id_funcionario = usuarios.id
            WHERE movimentacoes.id_administrador = ? AND
            data_criacao BETWEEN ? AND ?
        `, [idDono, dataInicial, `${dataFinal} 23:59:59`]);

    if (movimentacoes.length == 0) {
        return res.status(200).json({
            mensagem: 'Sem produtos!'
        })
    }

    return res.status(200).json({
        movimentacoes
    })
}