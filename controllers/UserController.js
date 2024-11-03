import User from '../models/User.js';

export default class UserController {
    static createUser(req, res) {
        res.render('users/create')
    }

    static showUsers(req, res) {
        res.render('users/all')
    }
};