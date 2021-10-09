require('dotenv').config();
const express = require('express');
const es6renderer = require('express-es6-template-engine');
const morgan = require('morgan');

const server = express();

server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
})

const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})