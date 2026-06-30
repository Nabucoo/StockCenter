const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtosController');
const auth = require('../midlleware/auth');
const authAdm = require('../midlleware/authAdm');

router.post('/cadastrar', auth, produtosController.cadastrar);
router.patch('/remover/:id', auth, produtosController.remover);
router.patch('/editar/:id', auth, produtosController.editar);
router.get('/listar', auth, produtosController.listar);


module.exports = router;