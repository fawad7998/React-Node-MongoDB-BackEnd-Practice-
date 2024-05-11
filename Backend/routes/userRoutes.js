const express = require('express');
const { login, register, update } = require('../controllers/usercontroller');
const authRouters = express.Router();

authRouters.post('/login', login);
authRouters.post('/register', register);
authRouters.patch('/update', update);

module.exports = authRouters;
