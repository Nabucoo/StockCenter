const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes');
const verifyRoutes = require('./routes/verifyRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/funcionarios', funcionariosRoutes);
app.use('/verify', verifyRoutes);

module.exports = app;
