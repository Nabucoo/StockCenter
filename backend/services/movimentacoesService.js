const movimentacoesRepository = require('../repository/movimentacoesRepository');
const ServiceError = require('./ServiceError');

function getIdDono(usuario) {
    return usuario.idAdministrador ? usuario.idAdministrador : usuario.id;
}

async function listar(usuario) {
    const idDono = getIdDono(usuario);
    return movimentacoesRepository.listarPorAdministrador(idDono);
}

async function filtrar({ dataInicial, dataFinal }, usuario) {
    if (!dataInicial || !dataFinal) {
        throw new ServiceError(400, "Informe a data inicial e a data final.");
    }

    const idDono = getIdDono(usuario);
    const movimentacoes = await movimentacoesRepository.filtrarPorPeriodo(
        idDono,
        dataInicial,
        dataFinal
    );

    if (movimentacoes.length === 0) {
        return {
            mensagem: 'Sem produtos!'
        };
    }

    return {
        movimentacoes
    };
}

module.exports = {
    listar,
    filtrar
};
