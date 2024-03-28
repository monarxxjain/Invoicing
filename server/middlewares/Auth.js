const prisma = require('../db')

const getUser = async (req, res, next) => {
    const { email } = req.body
    const user = await prisma.users.findUnique({ where: { email } });
    if(user){
        return res.status(201).json({error: "User Already Exists with this EmailID"})
    }
    next()
}

module.exports = {
    getUser
}