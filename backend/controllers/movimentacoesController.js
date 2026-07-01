const movimentacoesService = require('../services/movimentacoesService');
const handleError = require('./handleError');

exports.listar = async (req, res) => {
    try {
        const movimentacoes = await movimentacoesService.listar(req.usuario);

        return res.status(200).json({
            movimentacoes
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.filtrar = async (req, res) => {
    try {
        const resultado = await movimentacoesService.filtrar(req.query, req.usuario);

        return res.status(200).json(resultado);
    } catch (error) {
        return handleError(error, res);
    }
};
