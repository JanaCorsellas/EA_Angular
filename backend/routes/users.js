const express = require('express');
const router = express.Router();
const User = require('../models/User');

//obtenir tots els usuaris
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

module.exports = router;
