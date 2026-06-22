const express = require('express');
const router = express.Router();
const auth = require('../midlleware/auth')
const authAdm = require('../midlleware/authAdm');

router.get('/', auth,  (req, res) => {
    res.status(200).json({
        valid: true
    })
});
router.get('/adm', auth, authAdm, (req, res) => {
    res.status(200).json({
        valid: true
    })
});

module.exports = router