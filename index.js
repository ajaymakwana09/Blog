const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const port = 3004;
const app = express();
const routes = require('./Routes/route'); 
const db = require("./config/db");
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const passport = require('passport');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(cookieparser());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie:{secure:false}
}));

app.use(flash());

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes); 

app.listen(port, () => {
    console.log("server is running...");
});
