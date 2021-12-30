const env = require('../env.js');

const knex = require('../db/knex.js');
const router = require('./routes/router.js')
const express = require("express");
const winston = require('winston');
const errorHandler = require('./middleware/errorHandler.js');
const notFoundHandler = require('./middleware/notFoundHandler.js');
const httpLogger = require('./middleware/httpLogger.js');
const path = require('path');
//Initialize express app
const app = express();
const cors = require("cors");
const { format } = require('path');


//midleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); 

const logConfig = {
    exitOnError: false,
    'transports': [
        new winston.transports.Console({
            //format: winston.format.simple(),
            handleExceptions: true,
            handleRejections: true
        }),
        new winston.transports.File({
            filename: path.resolve(`log/${process.env.NODE_ENV}.log`), 
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.align(),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )

}
const logger = winston.createLogger(logConfig);

//Look for local port to host the web application
const port = process.env.PORT || 80;

//ROUTES//


app.use(errorHandler(logger));
app.use(httpLogger(logger));
//PUT : Update / Replace
//DELETE : Delete
app.use('/', router);
app.use(notFoundHandler(logger));

//Initalize web-app on selected port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    logger.info(`Server started and running on port ${port}`);
}) 
