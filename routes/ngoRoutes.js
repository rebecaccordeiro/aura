import express from "express";
const router = express.Router();

import NgoController from '../controllers/NgoController.js';

router.get('/add', NgoController.createNgo);
router.get('/', NgoController.showNgos);

export default router;