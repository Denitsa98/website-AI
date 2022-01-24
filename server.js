const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path:'./spec.env'})

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

// Parse URL-encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended : false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// view engine setup
app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error)
    }else{
        console.log("MYSQL Connected")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/welcome', require('./routes/auth')); 
app.use('/project', require('./routes/proj')); 
app.use('/partic_proj', require('./routes/partic_proj'));
app.use('/profile', require('./routes/profile'));

//errors: page not found 404
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

app.use((err, req,res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

app.listen(PORT, () => console.log('Server started on port '+ PORT));


