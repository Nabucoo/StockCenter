const authService = require('../services/authService');
const handleError = require('./handleError');

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);

        return res.status(200).json({
            mensagem: 'usuário logado',
            token
        });
    } catch (error) {
        return handleError(error, res);
    }
};
