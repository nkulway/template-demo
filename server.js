require('dotenv').config();
const express = require('express');
const es6renderer = require('express-es6-template-engine');
const morgan = require('morgan');

const server = express();

server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
});


//template rendering 
server.engine('html', es6renderer);
server.set('views', 'views')
server.set('view engine', 'html');


server.get('/', (req, res) => {
    res.render('landing', {

    })
})

const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})