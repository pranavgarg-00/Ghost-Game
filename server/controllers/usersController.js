const knex = require('../../db/knex');

/** Gets all users
 *
 * @type {e.RequestHandler}
 * @param {e.request} req
 * @param {e.Response} res payload with all users
 */
 async function index(req, res) {
    try {
        // SELECT id, name FROM USERS
        const result = await knex('users').select({
            id: 'id',
            name: 'name'
        });
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
 }


/** Creates a new user
 *
 * @type {e.RequestHandler}
 * @param {e.Request} req body contains necessary fields for a user
 * @param {e.Response} res
 */
async function create(req, res) {
    const name = await req.body.name ? req.body.name : '';
    //const email = req.body.email ? req.body.email : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'});
    }
    try {
        const id = await(knex('users').insert({name}));
        //get user by id
        const user = await(knex('users').select({
            id: 'id',
            name: 'name'
        }).where({id}));
        return res.json(user[0]);
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}

module.exports = {
    index,
    create
}