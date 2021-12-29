const knex = require('../../db/knex');
const HTTP = require('http-status-codes');

//GET
/** Gets all users
 *
 * @type {e.RequestHandler}
 * @param {e.request} req
 * @param {e.Response} res payload with all users
 */
 async function index(req, res) {
    try {
        // SELECT id, name FROM users
        const result = await knex('users').select({
            id: 'id',
            name: 'name'
        }); 
        return res.status(HTTP.StatusCodes.OK).json(result);
    } catch (err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
 }

//POST
/** Creates a new user
 *
 * @type {e.RequestHandler}
 * @param {e.Request} req body contains necessary fields for a user
 * @param {e.Response} res
 */
async function create(req, res) {

    const name = req.body.name ? req.body.name : '';
    //const email = req.body.email ? req.body.email : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'});
    }
    // knex('users')
    //     .returning('id')
    //     .insert({name})
    //     .then((id) => {
    //     //get user by id
    //     knex('users').select({
    //         id: 'id',
    //         name: 'name'
    //     })
    //         .where({id : id[0]})
    //         .then((user) => {
    //         return res.status(HTTP.StatusCodes.OK).json(user[0]);
    //     })
    // })
    //     .catch((err) => {
    //     console.error(err);
    //     return res.json({success: false, message: 'error occured outside'});
    // });
    try {
        const id = await knex('users').returning('id').insert({name});
        //get user by id
        const user = await knex('users').select({
            id: 'id',
            name: 'name'
        }).where({id : id[0]});

        return res.status(HTTP.StatusCodes.OK).json(user[0]);
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}

module.exports = {
    index,
    create
}