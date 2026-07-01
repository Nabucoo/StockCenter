const funcionariosService = require('../services/funcionariosService');
const handleError = require('./handleError');

exports.listar = async (req, res) => {
    try {
        const funcionarios = await funcionariosService.listar(req.usuario);

        return res.status(200).json({
            funcionarios
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const mensagem = await funcionariosService.cadastrar(req.body, req.usuario);

        return res.status(201).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.remover = async (req, res) => {
    try {
        const mensagem = await funcionariosService.remover(req.params.id);

        return res.status(200).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.editar = async (req, res) => {
    try {
        const mensagem = await funcionariosService.editar(req.params.id, req.body);

        return res.status(200).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};
