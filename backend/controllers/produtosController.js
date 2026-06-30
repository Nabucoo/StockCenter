const connection = require('../database/connection');
const Produto = require('../models/Produto');

exports.listar = async(req, res) => {
    const usuario = req.usuario;
    const idDono = usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
    const [produtos] = await connection.query(`
        SELECT id, nome, quantidade, preco_compra, preco_venda, departamento
        FROM produtos
        WHERE id_administrador = ?`, [idDono]);

    console.log(produtos);

    return res.status(200).json({
        produtos
    })

}

exports.cadastrar = async (req, res) => {
    const { nome, quantidade, precoCompra, precoVenda, departamento } = req.body;
    const usuario = req.usuario;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            mensagem: "O nome do produto é obrigatório."
        });
    }

    if (quantidade < 0) {
        return res.status(400).json({
            mensagem: "A quantidade não pode ser negativa."
        });
    }

    if (precoCompra < 0 || precoVenda < 0) {
        return res.status(400).json({
            mensagem: "Os preços de compra e venda não podem ser valores negativos."
        });
    }

    if (Number(precoVenda) < Number(precoCompra)) {
        return res.status(400).json({
            mensagem: "O preço de venda não pode ser menor que o preço de compra."
        });
    }

    const novoProduto = new Produto(nome, quantidade, precoCompra, precoVenda, departamento);

    const idDono = usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
    const idFuncionario = usuario.id;

    await connection.query(
        `INSERT INTO produtos
        (nome, quantidade, preco_compra, preco_venda, departamento, id_administrador)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            novoProduto.nome,
            novoProduto.quantidade,
            novoProduto.precoCompra,
            novoProduto.precoVenda,
            novoProduto.departamento,
            idDono
        ]
    );

    await connection.query(
        `INSERT INTO movimentacoes
        (id_funcionario, id_administrador, produto, quantidade, valor_total, tipo)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            idFuncionario,
            idDono,
            novoProduto.nome,
            novoProduto.quantidade,
            novoProduto.quantidade * novoProduto.precoCompra,
            "entrada"
        ]
    );

    return res.status(201).json({
        mensagem: "Produto criado com sucesso!"
    });
};

exports.remover = async (req, res) => {
    const id = req.params.id;
    const quantidade = Number(req.body.quantidade);
    const usuario = req.usuario;

    const idDono = usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
    const idFuncionario = usuario.id;

    if (quantidade <= 0) {
        return res.status(400).json({
            mensagem: "Quantidade inválida!"
        });
    }

    const [rows] = await connection.query(
        `SELECT nome, quantidade, preco_compra
         FROM produtos
         WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });
    }

    const produto = rows[0];

    if (quantidade > produto.quantidade) {
        return res.status(400).json({
            mensagem: "Quantidade inválida."
        });
    }

    if (quantidade < produto.quantidade) {
        await connection.query(
            `UPDATE produtos
             SET quantidade = ?
             WHERE id = ?`,
            [produto.quantidade - quantidade, id]
        );
    } else {
        await connection.query(
            `DELETE FROM produtos
             WHERE id = ?`,
            [id]
        );
    }

    await connection.query(
        `INSERT INTO movimentacoes
        (id_funcionario, id_administrador, produto, quantidade, valor_total, tipo)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            idFuncionario,
            idDono,
            produto.nome,
            quantidade,
            quantidade * produto.preco_compra,
            "saida"
        ]
    );

    return res.status(200).json({
        mensagem: "Produto removido com sucesso!"
    });
};

exports.editar = async(req, res) => {
    const id = req.params.id;
    const { novoNome, novaQuantidade, novoPrecoCompra, novoPrecoVenda, novoDepartamento } = req.body;
    const usuario = req.usuario;
    console.log(novoNome, novaQuantidade, novoPrecoCompra, novoPrecoVenda, novoDepartamento);

    if (!novoNome || novoNome.trim() === "") {
        return res.status(400).json({
            mensagem: "O nome do produto é obrigatório."
        });
    }

    if (novaQuantidade < 0) {
        return res.status(400).json({
            mensagem: "A quantidade não pode ser negativa."
        });
    }

    if (novoPrecoCompra < 0 || novoPrecoVenda < 0) {
        return res.status(400).json({
            mensagem: "Os preços de compra e venda não podem ser valores negativos."
        });
    }

    if (Number(novoPrecoVenda) < Number(novoPrecoCompra)) {
        return res.status(400).json({
            mensagem: "O preço de venda não pode ser menor que o preço de compra."
        });
    }

    await connection.query(
        `
            UPDATE produtos 
            SET nome = ?, quantidade = ?, preco_compra = ?, preco_venda = ?, departamento = ? 
            WHERE id = ?
            `, [novoNome, novaQuantidade, novoPrecoCompra, novoPrecoVenda, novoDepartamento, id]);

    return res.status(200).json({
        mensagem: "Produto atualizado com sucesso!"
    });
}