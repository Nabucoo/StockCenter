const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const movimentacoesRoutes = require('./routes/movimentacoesRoutes');
const verifyRoutes = require('./routes/verifyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/funcionarios', funcionariosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/movimentacoes', movimentacoesRoutes);
app.use('/verify', verifyRoutes);

module.exports = app;
