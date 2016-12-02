'use strict';

let User = require('./repository');

/**
 * GET /
 * @param req
 * @param res
 * @param next
 */
async function list(req, res, next) {
    try {
        const { limit = 50, skip = 0 } = req.query;
        let data = await User.list({ limit, skip });
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Get User
 * @returns {User}
 */
async function get(req, res, next) {
  try {
        let data = await User.get(req.params.userId);
        res.json({ data });
    } catch (err) {
        next(err);
    }
}


/**
 * Get User
 * @returns {User}
 */
async function load(req, res, next, id) {
    try {
        let data = await User.get(id);
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Create new User
 * @property {string} req.body.username - The username of User.
 * @property {string} req.body.password - The password of User.
 * @returns {User}
*/
async function create(req, res, next) {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        let data = await user.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Update existing User
 * @property {string} req.body.username - The username of User.
 * @property {string} req.body.password - The password of User.
 * @returns {User}
 */
async function update(req, res, next) {
    const user = await User.get(req.params.userId);
    user.username = req.body.username;
    user.password = req.body.password;

    try {
        let data = await user.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/**
 * Delete User.
 * @returns {User}
 */
async function remove(req, res, next) {
    try {
        const user = await User.get(req.params.userId);
        let data = await user.remove();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}

export { load, list, get, create, update, remove };
