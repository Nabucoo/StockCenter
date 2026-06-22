function authAdm(req, res, next) {

    if (req.usuario.idAdministrador) {

        return res.status(403).json({
            mensagem: 'Acesso negado'
        });
    }

    next();
}

module.exports = authAdm;