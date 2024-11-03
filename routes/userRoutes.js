import express from "express";
const router = express.Router();

import UserController from '../controllers/UserController.js';

router.get('/add', UserController.createUser);
router.get('/', UserController.showUsers);

export default router;