const express = require('express');
const usersController = require('../controllers/usersController');

const router = new express.Router;
//middleware

//routes
router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.retrieve);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

router.get('/home/:column/:order', function (req, res) {
    const {column , order} = req.params;
    res.send(column);
})
  
// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
})

module.exports = router;