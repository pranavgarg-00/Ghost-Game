const express = require('express');
const path = require('path');
const usersController = require('../controllers/usersController');
const solverController = require('../controllers/solverController');
const notFoundHandler = require('../middleware/notFoundHandler');

const router = new express.Router;
//middleware

function file(path) {
    return (req, res) => res.sendFile(path);
}

function routers({ publicPath } = {}, logger) {
    const router = new express.Router;
    //router.use('/api', responseType('json'));
    router.get('/api/users', usersController.retrieve); 
    router.post('/api/users', usersController.create);
    router.get('/api/users/all', usersController.index);
    router.put('/api/users/:id', usersController.update);
    router.delete('/api/users/:id', usersController.destroy);

    router.get('/api/solve', solverController.retrieve);
    // router.get('/api/solve/all', solverController.index);    
    router.use('/api', notFoundHandler());
    router.get('*', express.static(publicPath));
    router.use(file(path.join(publicPath, "index.html")));
    return router;
}


// router.get('/home/:column/:order', function (req, res) {
//     const {column , order} = req.params;
//     res.send(column);
// })
  
// // About page route.
// router.get('/about', function (req, res) {
//     res.send('About this wiki');
// })


module.exports = routers;