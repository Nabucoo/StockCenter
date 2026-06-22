const connection = require('../database/connection');
const { gerarToken } = require('../services/authService');

exports.listar = async(req, res) => {
    const adm = req.usuario;
    console.log(adm)
    const [funcionarios] = await connection.query(
        'SELECT id, nome, email, senha FROM usuarios WHERE id_administrador = ? AND ativo = ?', [adm.id, 1]
    );
    console.log(funcionarios)

    return res.status(200).json({
        funcionarios
    })
}

exports.cadastrar = async(req, res) => {
    const { nome, email, senha } = req.body;
    const adm = req.usuario;

    console.log(nome, email, senha);
    console.log(adm);

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    const [rows] = await connection.query(
        'SELECT email FROM usuarios WHERE email = ?', [email]
    );

    if (rows.length > 0) {
        return res.status(400).json({
            mensagem: 'Email em uso!'
        })
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: "Senha deve conter > 8 caracteres!"
        })
    }

    const tipo = "FUNCIONARIO"
    await connection.query(
        'INSERT INTO usuarios (nome, email, senha, tipo, id_administrador) VALUES (?, ?, ?, ?, ?)', [nome, email, senha, tipo, adm.id]
    );

    return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!'
    });
}
exports.remover = async(req, res) => {
    const id = req.params.id
    console.log(id)

    await connection.query(
        'UPDATE usuarios SET ativo = ? WHERE id = ?', [0, id]
    );

    return res.status(200).json({
        mensagem: "Funcionário removido com sucesso!"
    });
}

exports.editar = async(req, res) => {
    const id = req.params.id;
    console.log(id)
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    const [rows] = await connection.query(
        'SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, id]
    );

    console.log(rows)

    if (rows.length > 0) {
        return res.status(400).json({
            mensagem: 'Email em uso!'
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: "Senha deve conter > 8 caracteres!"
        })
    }

    await connection.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id]
    );

    return res.status(200).json({
        mensagem: 'Funcionário atualizado com sucesso!'
    });
}