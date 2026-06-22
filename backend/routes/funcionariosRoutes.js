const express = require('express');
const router = express.Router();

const funcionariosController = require('../controllers/funcionariosController');
const auth = require('../midlleware/auth');
const authAdm = require('../midlleware/authAdm');

router.get('/', auth, authAdm, funcionariosController.listar);

router.get('/listar', auth, authAdm, funcionariosController.listar);
router.post('/cadastrar', auth, authAdm, funcionariosController.cadastrar);
router.delete('/remover/:id', auth, authAdm, funcionariosController.remover);
router.patch('/editar/:id', auth, authAdm, funcionariosController.editar);

module.exports = router;