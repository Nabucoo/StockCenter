const jwt = require('jsonwebtoken');
const usuariosRepository = require('../repository/usuariosRepository');
const ServiceError = require('./ServiceError');

function gerarToken(usuario) {
    return jwt.sign({
            id: usuario.id,
            email: usuario.email,
            idAdministrador: usuario.id_Administrador
        },
        process.env.JWT_SECRET, {
            expiresIn: '1d'
        }
    );
};

async function login({ email, senha }) {
    if (!email || !senha) {
        throw new ServiceError(400, 'Preencha todos os campos');
    }

    const usuario = await usuariosRepository.buscarLoginPorEmail(email);

    if (!usuario || usuario.senha != senha) {
        throw new ServiceError(400, 'Email ou senha inválidos!');
    }

    return gerarToken(usuario);
}

module.exports = {
    gerarToken,
    login
}
