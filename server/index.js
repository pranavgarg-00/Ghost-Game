const env = require('../env.js');

const knex = require('../db/knex.js')
const express = require("express");
//Initialize express app
const app = express();
const cors = require("cors");


//midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Look for local port to host the web application
const port = process.env.PORT || 80;

//ROUTES//
//GET : READ
app.get('/users', (req, res) => {
    //res.send(process.env.DB_NAME);
    //knex.getAll().then(results => res.send(results))
    knex('users').select({
        id: 'id',
        name: 'name'
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    })
})
//POST : CREATE
app.post('/', (req, res) => {
    const name = req.body.name ? req.body.name : '';
    //const email = req.body.email ? req.body.email : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'});
    }
    knex('users')
        .insert({name})
        .then((id) => {
        //get user by id
        knex('users')
            .select({
            id: 'id',
            name: 'name'
        })
            .where({id})
            .then((user) => {
            return res.json(user[0]);
        })
    })
    .catch((err) => {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    })
});

//PUT : Update / Replace
//DELETE : Delete

//Initalize web-app on selected port
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
}) 