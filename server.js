const express = require('express'); //importing all the modules
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // seting up the dotenv(.env) module 
//bring routes
const blogRouts = require('./routs/blog');
const authRouts = require('./routs/auth');
const userRouts = require('./routs/user');
const categoryRouts = require('./routs/category');
const tagRouts = require('./routs/tag');
const formRouts = require('./routs/form');



// database connection
mongoose
.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// app
const app = express(); // stores the express app in a variable

// middlewares
app.use(morgan('dev')); //dev - in development mode, shows stuff in the console
app.use(bodyParser.json()); 
app.use(cookieParser());
//cors
if(process.env.NODE_ENV = 'development'){
    app.use(cors({ origin: `${process.env.CLIENT_URL}` })); //alowes us to request/respond from the client origin to the development origin even when they ar on different ports
}

// routes middleware
app.use('/api', blogRouts);
app.use('/api', authRouts);
app.use('/api', userRouts);
app.use('/api', categoryRouts);
app.use('/api', tagRouts);
app.use('/api', formRouts);


// port
const port = process.env.Port || 8000; //runs the server in port (which is 8000) or at 8000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});