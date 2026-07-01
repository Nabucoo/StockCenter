const usuariosRepository = require('../repository/usuariosRepository');
const ServiceError = require('./ServiceError');

function validarCamposObrigatorios({ nome, email, senha }) {
    if (!nome || !email || !senha) {
        throw new ServiceError(400, 'Preencha todos os campos');
    }
}

function validarSenha(senha) {
    if (senha.length < 8) {
        throw new ServiceError(400, "Senha deve conter > 8 caracteres!");
    }
}

async function listar(administrador) {
    return usuariosRepository.listarFuncionariosAtivos(administrador.id);
}

async function cadastrar({ nome, email, senha }, administrador) {
    validarCamposObrigatorios({ nome, email, senha });

    const emailEmUso = await usuariosRepository.existeEmail(email);

    if (emailEmUso) {
        throw new ServiceError(400, 'Email em uso!');
    }

    validarSenha(senha);

    await usuariosRepository.cadastrarFuncionario({
        nome,
        email,
        senha,
        idAdministrador: administrador.id
    });

    return 'Usuário cadastrado com sucesso!';
}

async function remover(id) {
    await usuariosRepository.desativar(id);
    return "Funcionário removido com sucesso!";
}

async function editar(id, { nome, email, senha }) {
    validarCamposObrigatorios({ nome, email, senha });

    const emailEmUso = await usuariosRepository.existeEmailEmOutroUsuario(email, id);

    if (emailEmUso) {
        throw new ServiceError(400, 'Email em uso!');
    }

    validarSenha(senha);

    await usuariosRepository.editar({
        id,
        nome,
        email,
        senha
    });

    return 'Funcionário atualizado com sucesso!';
}

module.exports = {
    listar,
    cadastrar,
    remover,
    editar
};
