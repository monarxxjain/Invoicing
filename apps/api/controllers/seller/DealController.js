const { verify } = require("crypto");
const prisma = require("../../db");
const jwt = require("jsonwebtoken");

const addDeal = async (req, res) => {
  const data = req.body;
  const billVerify = () => {
    return true;
  };
  if (!billVerify()) {
    res.status(200).json({ error: "Bill can't be verified !" });
    return;
  }
  console.log("Deal ", data);
  try {
    let deal = await prisma.deal.create({
      data: {
        seller: { connect: { id: data.sellerId } },
        targetAmount: data.targetAmount,
        bill: data.bill,
        minInvestmentAmount: data.minInvestmentAmount,
        status: "PENDING",
        dealAim: data.dealAim,
        completionDate: data.completionDate,
        freezingDate: data.freezingDate,
        profitPercent: Number(data.interestRate),
        nftTokenId: data.nftTokenId,
        nftAddress: data.nftAddress,
        investors: { create: [] },
      },
      include: {
        investors: true, // Include the associated InvestorDeals in the returned Deal object
      },
    });
    deal.id = deal.id.toString();
    deal.investors = deal.investors.map((v) => {
      return { dealId: v.dealId.toString(), investorId: v.investorId };
    });
    console.log("Deal  ", deal);
    res.status(200).json(deal);
  } catch (e) {
    console.log("error in db ", e);
    res.status(402).json({ error: "Error adding new Deal" });
  }
};

const saveDraft = async (req, res) => {
  const data = req.body;
  const billVerify = () => {
    return true;
  };
  if (!billVerify()) {
    res.status(200).json({ error: "Bill can't be verified !" });
    return;
  }
  console.log("Deal ", data);
  try {
    let deal = await prisma.deal.create({
      data: {
        seller: { connect: { id: data.sellerId } },
        targetAmount: data.targetAmount,
        bill: data.bill,
        minInvestmentAmount: data.minInvestmentAmount,
        status: "DRAFT",
        dealAim: data.dealAim,
        completionDate: data.completionDate,
        freezingDate: data.freezingDate,
        profitPercent: Number(data.interestRate),
        nftTokenId: "",
        nftAddress: "",
        investors: { create: [] },
      },
      include: {
        investors: true, // Include the associated InvestorDeals in the returned Deal object
      },
    });
    deal.id = deal.id.toString();
    deal.investors = deal.investors.map((v) => {
      return { dealId: v.dealId.toString(), investorId: v.investorId };
    });
    console.log("Deal  ", deal);
    res.status(200).json({ message: "Draft Saved Successfully" });
  } catch (e) {
    console.log("error in db ", e);
    res.status(402).json({ error: "Error adding new Deal" });
  }
};

const investDeal = async (req, res) => {
  /*
  * if deal is open or not
  * if first time investing amount should be more than min
  * if modifying
  * Taking out entire money
  * Taking out some money 
  * Remaining investment should be more than min
  * If adding money
  * Then final amount should be less= than money req
  */

  try {
    const deal = req.body.deal;
    const amount = Number(req.body.amount);
    const investor = req.investor;

    if (deal.status !== "OPEN") {
      return res.status(200).json({ error: "Deal is not OPEN" });
    }

    if (amount <= 0) {
      return res
        .status(200)
        .json({ error: "Amount can't be less than or equal to zero" });
    }

    if (amount + Number(deal.currentAmount) > Number(deal.targetAmount)) {
      return res.status(200).json({
        error: "Amount should be less than or equal to available amount",
      });
    }

    // Check if the investor is already invested in this deal
    const existingInvestment = await prisma.investorDeals.findFirst({
      where: {
        dealId: deal.id,
        investorId: investor.id,
      },
    });

    if (existingInvestment) {
      const investorDeal = await prisma.investorDeals.update({
        where: {
          dealId_investorId: {
            dealId: existingInvestment.dealId,
            investorId: existingInvestment.investorId,
          },
        },
        data: {
          investmentAmount:
            Number(existingInvestment.investmentAmount) + amount,
        },
      });

      const updatedDeal = await prisma.deal.update({
        where: {
          id: deal.id,
        },
        data: {
          currentAmount: Number(deal.currentAmount) + amount,
        },
      });
    } else {
      if (amount < deal.minInvestmentAmount) {
        return res.status(200).json({
          error:
            "Amount should be more than minimum investment amount or equal to required amount to reach target",
        });
      }

      console.log(deal.id, investor.id, amount);

      const investorDeal = await prisma.investorDeals.create({
        data: {
          deal: {
            connect: {
              id: deal.id,
            },
          },
          investor: {
            connect: {
              id: investor.id,
            },
          },
          investmentAmount: amount,
        },
      });

      const updatedDeal = await prisma.deal.update({
        where: {
          id: deal.id,
        },
        data: {
          currentAmount: Number(deal.currentAmount) + amount,
        },
      });
    }

    if (
      Number(deal.targetAmount) - (Number(deal.currentAmount) + amount) <
      Number(deal.minInvestmentAmount)
    ) {
      const lastTransaction =
        (Number(deal.targetAmount) * 1e18 -
          (Number(deal.currentAmount) * 1e18 + amount * 1e18)) /
        1e18;
      return res.status(200).json({
        message: `ETH ${amount} Invested Successfully`,
        lastTransaction,
      });
    } else {
      return res.status(200).json({
        message: `ETH ${amount} Invested Successfully`,
        lastTransaction: false,
      });
    }
  } catch (error) {
    console.log("Error while investing money: ", error);

    res.status(400).json({ error: "Error while investing money" });
  }
};

const breakDealReq = async (req, res) => {
  try {
    const data = req.body;
    const { deal } = data;

    const investor = req.investor;
    // console.log(deal);

    // Check if deal status is OPEN
    if (deal.status !== "OPEN") {
      return res.status(200).json({ error: "Deal status is not OPEN" });
    }

    // Check if the investor is already invested in this deal
    const existingInvestment = await prisma.investorDeals.findFirst({
      where: {
        dealId: deal.id,
        investorId: investor.id,
      },
    });

    if (!existingInvestment) {
      return res
        .status(402)
        .json({ message: "You have note invested in this deal !" });
    }
    const amount = Number(existingInvestment.investmentAmount);
    await prisma.investorDeals.up;

    date({
      where: {
        dealId: deal.id,
        investorId: investor.id,
        status: "LIQUID",
      },
      data: {
        break: true,
      },
    });

    await prisma.deal.update({
      where: {
        id: deal.id,
      },
      data: {
        currentAmount: Number(deal.currentAmount) - Number(amount),
      },
    });
    return res.status(200).json({ message: "Request to break deal sent " });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const breakDeal = async (req, res) => {
  try {
    const data = req.body;
    const { deal } = data;

    const investor = req.investor;
    // console.log(deal);

    // Check if deal status is OPEN
    if (deal.status !== "OPEN") {
      return res.status(402).json({ message: "Deal status is not OPEN" });
    }

    // Check if the investor is already invested in this deal
    const existingInvestment = await prisma.investorDeals.findFirst({
      where: {
        dealId: deal.id,
        investorId: investor.id,
        status: "LIQUID",
      },
    });

    if (!existingInvestment) {
      return res
        .status(402)
        .json({ message: "You have note invested in this deal !" });
    }

    await prisma.investorDeals.UPDATE({
      where: {
        dealId: deal.id,
        investorId: investor.id,
        break: true,
      },
      break: false,
      status: "BREAKED",
    });

    return res.status(200).json({ message: "Deal breaked !" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyDeal = async (req, res) => {
  const data = req.body;

  try {
    let deal = await prisma.deal.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        status: "OPEN",
      },
    });
    deal.id = deal.id.toString();
    res.status(200).json(deal);
  } catch (e) {
    console.log("error in db ", e);
    res.status(402).json({ error: "Error verifying Deal" });
  }
};

const getSellerDeals = async (req, res) => {
  const token = req.cookies.access_token;
  const decodedToken = jwt.decode(token);
  const { wolleteAddr } = decodedToken;
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        wolleteAddr: wolleteAddr,
      },
      include: {
        deals: {
          where: {
            status: req.body.status,
          },
          include: {
            seller: true,
            investors: true,
          },
        },
      },
    });

    let deals = seller?.deals?.map((deal) => {
      let elem = deal;
      elem.id = deal.id.toString();
      return elem;
    });
    res.status(200).json({
      message: `${req.body.status} Deals Fetched successfully`,
      deals,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(500)
      .json({ message: "Error while getting seller deals" });
  }
};

module.exports = {
  addDeal,
  investDeal,
  verifyDeal,
  breakDeal,
  breakDealReq,
  getSellerDeals,
  saveDraft,
};
