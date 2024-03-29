const prisma = require('../db')
const jwt = require("jsonwebtoken");
const getUser = async (req, res, next) => {
    const { email } = req.body
    const user = await prisma.users.findUnique({ where: { email } });
    if(user){
        req.userExists = true
        req.user = user
    }
    next()
}

const authorization = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({message: "JWT token NOT found"});
    }
    
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return next();

    } catch(error) {
        console.log("Authorization error: ", error)
        return res.status(403).json({error: "Authorization Error"});
    }
  };

module.exports = {
    getUser,
    authorization
}