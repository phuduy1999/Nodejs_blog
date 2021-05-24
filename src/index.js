const path = require('path');
const express = require('express');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db=require('./config/db')

//Connect DB
db.connect();

// app.use(morgan('combined'))

//chi ra static folder
app.use(express.static(path.join(__dirname, 'public')));

//middleware parse body
app.use(
    express.urlencoded({
        //submit form method post
        extended: true,
    }),
);
app.use(express.json()); //XMLHttpRequest, ajax, hoac submit bang code js,...

//Template engine
app.engine(
    '.hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});