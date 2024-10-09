const prisma = require("../../db");

const { generateJwtToken } = require("../AuthController");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const addNewSellerRequest = async (req, res) => {
  try {
    if (req.seller) {
      return res
        .status(200)
        .json({ error: "Seller Already Exists with this EmailID" });
    }

    const { password } = req.body;

    // Hashing password coming from frontend and then storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const seller = await prisma.seller.create({
      data: {
        ...req.body,
        status: "PENDING",
        password: hashedPassword,
      },
    });

    const result = {
      role: "SELLER",
      wolleteAddr: req.body.wolleteAddr,
      sellerId: seller.id,
      email: req.body.email,
      status: "PENDING"
    }

    res
      .cookie("ROLE", "SELLER", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("WOLLETEADDR", req.body.wolleteAddr, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("SELLER_ID", seller.id, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("EMAIL", req.body.email, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Seller Request has been generated successfully", result });
  } catch (error) {
    console.log("Error Creating Seller: ", error);

    res.status(401).json({ error: "Error Creating Seller" });
  }
};

const handleSellerRequest = async (req, res) => {
  try {
    const seller = await prisma.seller.update({
      where: {
        wolleteAddr: req.body.wolleteAddr,
      },
      data: { status: req.body.status },
    });

    res
      .status(200)
      .json({ message: `Seller has been ${req.body.status} Successfully!!` });
  } catch (error) {
    console.log("Error Handling Seller: ", error);

    res.status(403).json({ error: "Error handling Seller" });
  }
};

const loginSeller = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(404).json({ error: "Seller Does not Exist" });
    }
    if (req.seller.status == "PENDING") {
      return res
        .status(200)
        .json({ error: "Your profile is currently under Review" });
    }
    const { password } = req.body;
    const dbPassword = req.seller.password;

    // Comparing hashed password and request password
    const isPasswordCorrect = await bcrypt.compare(password, dbPassword);
    if (isPasswordCorrect) {
      const userObj = {
        name: req.seller.name,
        email: req.body.email,
        role: "SELLER",
        wolleteAddr: req.body.wolleteAddr,
        status: "APPROVED"
      };
      const token = generateJwtToken(userObj);

      const result = {
        role: "SELLER",
        wolleteAddr: req.body.wolleteAddr,
        sellerId: req.seller.id,
        email: req.body.email,
        access_token: token,
        name: req.seller.name
      }

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 86400000
        })
        .cookie("ROLE", "SELLER", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .cookie("WOLLETEADDR", req.body.wolleteAddr, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .cookie("SELLER_ID", req.seller.id, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .cookie("EMAIL", req.body.email, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 2600000000,
        })
        .status(200)
        .json({ message: "Logged in Successfully", result });
        
    } else res.status(200).json({ message: "Wrong Password" });
  } catch (error) {
    console.error("Error logging in Seller:", error);

    res.status(500).json({ error: "Could not Log In Seller" });
  }
};

module.exports = {
  addNewSellerRequest,
  handleSellerRequest,
  loginSeller,
};
