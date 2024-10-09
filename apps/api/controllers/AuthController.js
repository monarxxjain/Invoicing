const prisma = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const generateJwtToken = (userObj) => {
  const expiresIn = process.env.JWT_EXPIRY || "1d";
  const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn });
  return token;
};

const addEmployee = async (req, res) => {
  try {
    // Hashing password coming from frontend and then storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const employee = await prisma.employee.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });

    console.log("Employee Added Successfully")

    const result = {
      role: req.body.role,
      wolleteAddr: req.body.wolleteAddr
    }

    res
      .cookie("ROLE", req.body.role, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2600000000
      })
      .cookie("WOLLETEADDR", req.body.wolleteAddr, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2600000000
      })
      .status(201)
      .json({ message: "Employee Added Successfully", result });
  } catch (error) {
    console.log("Error Creating Employee: ", error);

    res.status(401).json({ error: "Error Creating Employee" });
  }
};

const loginEmployee = async (req, res) => {
  try {
    if (!req.employee) {
      return res.status(200).json({ error: "Employee Does not Exist" });
    }
    const { password } = req.body;
    const dbPassword = req.employee.password;

    // Comparing hashed password and request password as well as PAN Card Number
    const isPasswordCorrect = await bcrypt.compare(password, dbPassword);
    if (isPasswordCorrect) {
      const expiryTime = process.env.JWT_EXPIRY || "1d";

      const userObj = {
        name: req.employee.name,
        email: req.body.email,
        role: req.employee.role,
      };
      const token = generateJwtToken(userObj);

      console.log("Employee Logged in Successfully")

      const result = {
        access_token: token,
        email: req.body.email,
        name: req.employee.name,
        role: req.employee.role
      }
      
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 86400000
        })
        .cookie("EMAIL", req.body.email, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .cookie("NAME", req.employee.name, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .cookie("ROLE", req.employee.role, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .status(200)
        .json({
          message: "Employee Logged in Successfully",
          result
        });
    } else {
      res.status(200).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    console.log("Error Logging in Employee: ", error);

    return res.status(404).json({ error: "Error Logging in Employee" });
  }
};

const logout = (req, res) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      maxAge: 0,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "You have logged Out Successfully" });
};

module.exports = {
  generateJwtToken,
  addEmployee,
  loginEmployee,
  logout,
};
