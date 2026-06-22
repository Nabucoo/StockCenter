const jwt = require('jsonwebtoken');

function gerarToken(usuario) {
    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            idAdministrador: usuario.id_Administrador
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );
};

module.exports = { gerarToken }
