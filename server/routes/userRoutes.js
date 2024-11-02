// server/routes/userRoutes.js
const express = require('express');
const { createUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);

// Outros endpoints: PUT /users/:id, DELETE /users/:id
module.exports = router;
