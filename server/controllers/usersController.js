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
        console.log(result);
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
async function retrieve(req, res) {
    try {
        const id = req.query.id;
        console.log(id);

        const user = await knex('users').select({
            id: 'id',
            name: 'name'
        }).where({id});
        console.log(user[0]);
        if (user[0] == null) {
            throw 'no results';
        }
        return res.status(HTTP.StatusCodes.OK).json([user[0]]);
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}
async function update(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const idToUpdate = await knex('users').where({id})
        .returning('id').update({name});

        const updatedUser = await knex('users').select({
            id: 'id',
            name: 'name'
        }).where({id : idToUpdate[0]});

        res.status(HTTP.StatusCodes.OK).json(updatedUser[0]);
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}
async function destroy(req, res) {
    try {
        const { id } = req.params;

        const idToUpdate = await knex('users')
            .returning(['id','name']).where({id}).delete();

        res.status(HTTP.StatusCodes.OK).json(idToUpdate[0]);
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }

}

module.exports = {
    index,
    create,
    retrieve,
    update,
    destroy
}