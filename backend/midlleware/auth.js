const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Token Inválido!"
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch {

        return res.status(401).json({
            mensagem: "Token Inválido!"
        });

    }
}

module.exports = auth;
