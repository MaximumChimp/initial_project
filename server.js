// imports
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const EventEmitter = require('events');
const bodyParser = require('body-parser');
const chatEmitter = new EventEmitter();
const PORT = process.env.PORT || 4000;
const User = require('./models/User')


//Database Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI, () => {
    console.log("Database Successfully Connected!");
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.render('pages/index')
});

app.get('/users/signup', (req, res) => {
    res.render('pages/space')
});
app.get('/users/login', (req, res) => {
    res.render('pages/space')
});

app.get('/developers', (req, res) => {
    res.render('pages/developers')
});

app.get('/space', (req, res) => {
    res.render('pages/space')
});
app.get('/news', (req, res) => {
    res.render('pages/news')
});
app.get('/tools', (req, res) => {
    res.render('pages/tools')
});

//chats
app.get('/space/id', (req, res) => {
    res.render('pages/main')
});
app.get('/chat', respondChat);
function respondChat(req, res) {
    const { message } = req.query
    chatEmitter.emit('message', message)
    res.end()
}

app.get('/sse', respondSSE);
function respondSSE(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    const onMessage = msg => res.write(`data:${msg}\n\n`)
    chatEmitter.on('message', onMessage)
    res.on('close', function () {
        chatEmitter.off('message', onMessage)
    })
}
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})