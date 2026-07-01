const connection = require('../database/connection');

async function buscarLoginPorEmail(email) {
    const [usuarios] = await connection.query(
        'SELECT id, email, senha, id_Administrador FROM usuarios WHERE email = ?',
        [email]
    );

    return usuarios[0];
}

async function listarFuncionariosAtivos(idAdministrador) {
    const [funcionarios] = await connection.query(
        'SELECT id, nome, email, senha FROM usuarios WHERE id_administrador = ? AND ativo = ?',
        [idAdministrador, 1]
    );

    return funcionarios;
}

async function existeEmail(email) {
    const [usuarios] = await connection.query(
        'SELECT email FROM usuarios WHERE email = ?',
        [email]
    );

    return usuarios.length > 0;
}

async function existeEmailEmOutroUsuario(email, id) {
    const [usuarios] = await connection.query(
        'SELECT id FROM usuarios WHERE email = ? AND id != ?',
        [email, id]
    );

    return usuarios.length > 0;
}

async function cadastrarFuncionario({ nome, email, senha, idAdministrador }) {
    await connection.query(
        'INSERT INTO usuarios (nome, email, senha, tipo, id_administrador) VALUES (?, ?, ?, ?, ?)',
        [nome, email, senha, 'FUNCIONARIO', idAdministrador]
    );
}

async function desativar(id) {
    await connection.query(
        'UPDATE usuarios SET ativo = ? WHERE id = ?',
        [0, id]
    );
}

async function editar({ id, nome, email, senha }) {
    await connection.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [nome, email, senha, id]
    );
}

module.exports = {
    buscarLoginPorEmail,
    listarFuncionariosAtivos,
    existeEmail,
    existeEmailEmOutroUsuario,
    cadastrarFuncionario,
    desativar,
    editar
};
