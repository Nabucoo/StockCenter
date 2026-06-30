const express = require('express');
const router = express.Router();

movimentacoesController = require('../controllers/movimentacoesController');
const auth = require('../midlleware/auth');
const authAdm = require('../midlleware/authAdm');

router.get('/listar', auth, movimentacoesController.listar);
router.get('/filtrar', auth, movimentacoesController.filtrar);

module.exports = router;