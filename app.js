const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./services/accesslog');
const HttpStatus = require('http-status-codes');
const cors = require('cors');

// Routes import
const indexRouter = require('./routes/index');

// Express application settings
let app = express();

app.set('view engine', 'html');
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routers middleware
app.use('/', indexRouter);

// 404 Handler
app.use((req, res) => {
    res
        .status(HttpStatus.NOT_FOUND)
        .json({status: false});
});

port = process.env.port || 80;
app.listen(port, () => {
    console.log("Server has been started on port " + port);
});
