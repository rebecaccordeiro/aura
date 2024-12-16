import express from "express";
const router = express.Router();

import NgoController from '../controllers/NgoController.js';

router.get('/add', NgoController.createNgo);
router.get('/', NgoController.showNgos);
router.get('/page', NgoController.ngoPage);
router.get('/edit/:id', NgoController.editNgo);
router.post('/edit/:id', NgoController.updateNgo);
router.post('/delete', NgoController.deleteNgo);

export default router;