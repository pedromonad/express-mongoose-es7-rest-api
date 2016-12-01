'use strict';

let Client = require('./repository');

/**
 * GET /
 * @param req
 * @param res
 * @param next
 */
async function list(req, res, next) {
    try {
        const { limit = 50, skip = 0 } = req.query;
        let data = await Client.list({ limit, skip });
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Get client
 * @returns {Client}
 */
function get(req, res) {
  return res.json(req.client);
}


/**
 * Get client
 * @returns {Client}
 */
async function load(req, res, next, id) {
    try {
        let data = await Client.get(id);
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Create new client
 * @property {string} req.body.name - The name of client.
 * @property {string} req.body.lastName - The lastName of client.
 * @property {string} req.body.rg - The rg of client.
 * @property {string} req.body.cpf - The cpf of client.
 * @property {string} req.body.maritalStatus - The maritalStatus of client.
 * @property {string} req.body.sex - The sex of client.
 * @property {string} req.body.address - The address of client.
 * @property {string} req.body.city - The city of client.
 * @property {string} req.body.state - The state of client.
 * @property {string} req.body.phone - The phone of client.
 * @property {string} req.body.facebook - The facebook of client.
 * @property {string} req.body.email - The email of client.
 * @property {string} req.body.birthday - The birthday of client.
 * @property {string} req.body.info - The info of client.
 * @returns {Client}
*/
async function create(req, res, next) {
    try {
        const client = new Client({
            name: req.body.name,
            lastName: req.body.lastName,
            rg: req.body.rg,
            cpf: req.body.name,
            maritalStatus: req.body.maritalStatus,
            sex: req.body.sex,
            address: req.body.address,
            city: req.body.name,
            state: req.body.state,
            phone: req.body.phone,
            facebook: req.body.facebook,
            email: req.body.email,
            birthday: req.body.birthday,
            info: req.body.info
        });
        let data = await client.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Update existing client
 * @property {string} req.body.name - The name of client.
 * @property {string} req.body.lastName - The lastName of client.
 * @property {string} req.body.rg - The rg of client.
 * @property {string} req.body.cpf - The cpf of client.
 * @property {string} req.body.maritalStatus - The maritalStatus of client.
 * @property {string} req.body.sex - The sex of client.
 * @property {string} req.body.address - The address of client.
 * @property {string} req.body.city - The city of client.
 * @property {string} req.body.state - The state of client.
 * @property {string} req.body.phone - The phone of client.
 * @property {string} req.body.facebook - The facebook of client.
 * @property {string} req.body.email - The email of client.
 * @property {string} req.body.birthday - The birthday of client.
 * @property {string} req.body.info - The info of client.
 * @returns {Client}
 */
async function update(req, res, next) {
    const client = await Client.get(req.params.clientId);
    client.name = req.body.name;
    client.lastName = req.body.lastName;
    client.rg = req.body.rg;
    client.cpf = req.body.cpf;
    client.maritalStatus = req.body.maritalStatus;
    client.sex = req.body.sex;
    client.city = req.body.city;
    client.state = req.body.state;
    client.phone = req.body.phone;
    client.facebook = req.body.facebook;
    client.email = req.body.email;
    client.birthday = req.body.birthday;
    client.info = req.body.info;

    try {
        let data = await client.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Delete client.
 * @returns {Client}
 */
async function remove(req, res, next) {
    try {
        const client = await Client.get(req.params.clientId);
        let data = await client.remove();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Load comments and append to req.
 */
async function getComments(req, res, next) {
    try {
        const client = await Client.get(req.params.clientId);
        let data = client.comments;
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Create new comment
 * @property {string} req.body.description - The visit description of client.
 * @returns {Client}
 */
async function createComment(req, res, next) {
    try {
        const client = await Client.get(req.params.clientId);
        const comment = {
            description: req.body.description,
        };
        
        client.comments.push(comment);
        let comments = req.client.comments;

        let commentsSaved = await client.save();
        let data = commentsSaved.comments.pop();
        res.json({success: true, data });
    } catch (err) {
        next(err);
    }
}


/**
 * Delete comment.
 * @returns {Client}
 */
async function removeComment(req, res, next) {
    try {
        const client = await Client.get(req.params.clientId);
        client.comments.pull({ _id: req.params.commentId });
        let data = await client.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}



export { load, list, get, create, update, remove, removeComment, createComment, getComments };
