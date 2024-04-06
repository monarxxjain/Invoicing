const prisma = require('../db')
const jwt = require("jsonwebtoken");

const getEmployee = async (req, res, next) => {
    const { email } = req.body
    if(email){
      const employee = await prisma.employee.findUnique({ where: { email: email } });
      if(employee){
          req.employee = employee
      }
    }
    next()
}

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(201).json({error: "JWT token NOT found"});
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
      res.status(201).json({error: "Access Forbidden to this Role"})
    }
  };
};

module.exports = {
    authorization,
    roleAuthorization,
    getEmployee
}