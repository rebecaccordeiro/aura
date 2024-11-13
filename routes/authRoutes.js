import express from "express";
const router = express.Router();

import AuthController from '../controllers/AuthController.js';

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.get('/logout', AuthController.logout)
router.get('/registerngo', AuthController.registerngo)
router.post('/registerngo', AuthController.registerngoPost)

export default router;