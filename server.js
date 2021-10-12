require('dotenv').config();
const { application } = require('express');
const express = require('express');
const es6renderer = require('express-es6-template-engine');
const morgan = require('morgan');

const server = express();

server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
});


// middleware
server.use('/', express.static(__dirname + '/public'))


//template rendering 
server.engine('html', es6renderer);
server.set('views', 'views')
server.set('view engine', 'html');

server.get('/', (req, res) => {
    res.render('landing', {
        partials: {
            footer: 'partials/footer',
            header: 'partials/header'
        }
    })
})

// added route for the info page

server.get('/info.html', (req, res) => {
    res.render('info', {
        partials: {
            footer: 'partials/footer',
            header: 'partials/header'
        }
    })
})

const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})