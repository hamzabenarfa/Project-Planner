const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../controller/user');
const { register, login } = require('../controller/auth');

router.post('/register', async (req, response) => {
    const userData = req.body;
    try {
        const existingUser = await getUserByEmail(userData.email);
        if (existingUser) {
            return response.status(400).json({ error: 'User already exists' });
        }

        const result = await register(userData);
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: 'Error creating user' });
    }
});

router.post('/login', async (req, response) => {
    const userData = req.body;
    try {
        const user = await login(userData);
        if (user.error) {
            return response.status(400).json({ error: user.error });
        }
        response.json(user);
    } catch (error) {
        response.status(500).json({ error: 'Error logging in' });
    }
});


module.exports = router;
