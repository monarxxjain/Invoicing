const prisma = require('../db')
const UserModel = require('../models/UserModel')

const registerNewUser = async (req, res) => {
    try {
        const user = await prisma.users.create({
          data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Could not create user' });
    }
}

module.exports = {
    registerNewUser
}