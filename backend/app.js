const express = require('express');

const cadastrarRoutes = require('./routes/cadastrarRoutes');
const loginRoutes = require('./routes/loginRoutes');
const app = express();

app.use(express.json());

app.use('/cadastrar', cadastrarRoutes);
app.use('/login', loginRoutes);

module.exports = app;
