const produtosService = require('../services/produtosService');
const handleError = require('./handleError');

exports.listar = async (req, res) => {
    try {
        const produtos = await produtosService.listar(req.usuario);

        return res.status(200).json({
            produtos
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const mensagem = await produtosService.cadastrar(req.body, req.usuario);

        return res.status(201).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.remover = async (req, res) => {
    try {
        const mensagem = await produtosService.remover(
            req.params.id,
            req.body.quantidade,
            req.usuario
        );

        return res.status(200).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};

exports.editar = async (req, res) => {
    try {
        const mensagem = await produtosService.editar(req.params.id, req.body);

        return res.status(200).json({
            mensagem
        });
    } catch (error) {
        return handleError(error, res);
    }
};
