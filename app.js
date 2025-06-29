const express = require('express');
const PrivateRoutes = require('./src/routes/PrivateRoutes');
const TokenRoutes = require('./src/routes/TokenRoutes');
const UserRoutes = require('./src/routes/UserRoutes');

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    return response.send("Projeto Back-end Digital Store!")
})

app.use(TokenRoutes);
app.use(UserRoutes);
app.use(PrivateRoutes);

module.exports = app;