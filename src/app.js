const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser')
const ejs=require('ejs')
const multerconfig=require('./config/multerconfig')
const path = require('path')

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(cookieParser());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

const port = 3000;
const routes=require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'static')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'views'))


app.use('/',routes)


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})

