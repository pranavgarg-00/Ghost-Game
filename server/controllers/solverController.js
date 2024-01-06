const knex = require('../../db/knex');
const HTTP = require('http-status-codes');
const path = require('path');
const fs = require('fs');

//load dictionary
const dict = fs.readFileSync(path.resolve('server/dictionary/dictionary.txt')).toString().split("\n");

const dictionary = new Map();
for (i in dict) {
    const tokens = dict[i].split(/(?<=^\S+)\s/);
    dictionary.set(tokens[0], tokens[1].substring(2));
}
console.log("Built dictionary in memory.");

//python create_trie.py dictname
const { spawn } = require('child_process');
const pythonCreateTrie = spawn('python3', [path.resolve("server/scripts/create_trie.py"), "server/dictionary/words.txt"]);

const runPy = (id) => {
    return new Promise((success, nosuccess) => {
        const { spawn } = require('child_process');
        const pyQuery = spawn('python3', ['server/scripts/substring_to_string.py', id]);

        pyQuery.stdout.on('data', (data) => {
            success(data);
        });
        pyQuery.stderr.on('data', (data) => {
            nosuccess(data);
        });
    }
)};

/** Returns definition of word
 *
 * @type {e.RequestHandler}
 * @param {e.request} req
 * @param {e.Response} res payload with word and definition
 */

async function definition(req, res) {
    try {
        const id = req.query.id.toLowerCase();

        const definition = dictionary.get(id);
        if (definition === undefined) {
            throw 'no word';
        } 
        const entry = {
            id : 1,
            word: id,
            definition: definition
        }
        return res.status(HTTP.StatusCodes.OK).json([entry]);

    } catch (err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}

/** Gets all words that match
 *
 * @type {e.RequestHandler}
 * @param {e.request} req
 * @param {e.Response} res payload with matching words
 */

 async function retrieve(req, res) {
    try {
        const id = req.query.id.toLowerCase();
        console.log(id);

        runPy(id).then((fromRunpy) => {
            const data = fromRunpy.toString().split(/\r?\n/);
            if (data[0].charAt(0) === 'e') {
                throw 'No word';
            }
            const entry = {
                id : 1,
                word: data[1],
                definition: dictionary.get(data[1]),
                winning: data[0]
            }
            return res.status(HTTP.StatusCodes.OK).json([entry]);
        }).catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'error occured'});
        });
    
    } catch(err) {
        console.error(err);
        return res.json({success: false, message: 'error occured'});
    }
}

module.exports = {
    definition,
    retrieve
}