import Ngo from '../models/Ngo.js';

export default class NgoController {
    static createNgo(req, res) {
        res.render('ngos/create')
    }

    static showNgos(req, res) {
        res.render('ngos/all')
    }
};