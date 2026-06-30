const connection = require('../database/connection');
const { gerarToken } = require('../services/authService');

exports.login = async(req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    const [rows] = await connection.query(
        'SELECT id, email, senha, id_Administrador FROM usuarios WHERE email = ?', [email]
    );

    if (rows.length === 0) {
        return res.status(400).json({
            mensagem: 'Email ou senha inválidos!'
        })
    }

    if (rows[0].senha != senha) {
        return res.status(400).json({
            mensagem: 'Email ou senha inválidos!'
        })
    }
    const usuario = rows[0];

    const token = gerarToken(usuario);

    res.status(200).json({
        mensagem: 'usuário logado',
        token
    });
}