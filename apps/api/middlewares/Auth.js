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

const getEmployee = async (req, res, next) => {
    const { email } = req.body
    const employee = await prisma.employee.findUnique({ where: { email } });
    if(employee){
        req.employee = employee
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
      req.jwtPayload = data
      console.log("Token Authorized")
      return next();

    } catch(error) {
        console.log("Authorization error: ", error)
        return res.status(403).json({error: "Authorization Error"});
    }
};

const roleAuthorization = (roles) => {
  return (req, res, next) => {
    if(roles.includes(req.jwtPayload.role)){
      console.log("Role Authorized")
      next();
    }
    else{
      res.status(403).json({error: "Access Forbidden to this Role"})
    }
  };
};

module.exports = {
    getUser,
    authorization,
    roleAuthorization,
    getEmployee
}