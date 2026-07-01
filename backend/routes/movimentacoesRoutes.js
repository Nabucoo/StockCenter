const express = require('express');
const router = express.Router();

const movimentacoesController = require('../controllers/movimentacoesController');
const auth = require('../midlleware/auth');

router.get('/listar', auth, movimentacoesController.listar);
router.get('/filtrar', auth, movimentacoesController.filtrar);

module.exports = router;
