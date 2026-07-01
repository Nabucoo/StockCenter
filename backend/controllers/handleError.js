function handleError(error, res) {
    const status = error.status || 500;
    const mensagem = error.mensagem || "Erro interno no servidor";

    return res.status(status).json({
        mensagem
    });
}

module.exports = handleError;
