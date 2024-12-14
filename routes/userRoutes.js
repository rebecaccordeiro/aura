import express from "express";
const router = express.Router();

import UserController from '../controllers/UserController.js';

router.get('/add', UserController.createUser);
router.get('/', UserController.showUsers);
router.get('/profile', UserController.userProfile);
router.get('/edit', UserController.editUser);
router.get('/edit/:id', UserController.editUser)
router.post('/edit/:id', UserController.updateUser);
router.post('/delete', UserController.deleteUser);

export default router;