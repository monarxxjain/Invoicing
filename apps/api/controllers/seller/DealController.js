const { verify } = require("crypto");
const prisma = require("../../db");
const addDeal = async (req, res) => {
  const data = req.body;
  const billVerify = ()=>{return true;}
  if(!billVerify())
  {
    res.status(402).json({ error: "Bill can't be verified !" });
    return;
  }
  console.log("Deal ",data);
  try {

    let deal = await prisma.deal.create({
      data: {
        seller: { connect: { id: data.sellerId } },
        targetAmount: data.targetAmount,
        bill : data.bill,
        minInvestmentAmount: data.minInvestmentAmount,
        status: "PENDING",
        dealAim: data.dealAim ,
        tentativeDuration: data.tentativeDuration,
        profitPercent: Number(data.interestRate),
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




const investDeal = async (req, res) => {
  /*
  * if deal is open or not
  * if first time investing 
  amount should be more than min
  * if modifying
  * Taking out entire money
  * Taking out some money 
  * Remaining investment should be more than min
  * If adding money
  * Then final amount should be less= than money req
  */
 try {
    const data = req.body;
    const { deal, amount } = data;

    const investor = req.investor; 
    console.log(deal)

    // Check if deal status is OPEN
    if (deal.status !== 'OPEN') {
      return res.status(402).json({ message: "Deal status is not OPEN" });
    }

    // Check if the investor is already invested in this deal
    const existingInvestment = await prisma.investorDeals.findFirst({
      where: {
        dealId: deal.id,
        investorId: investor.id
      }
    });

    // If first time investing, amount should be more than min
    if (!existingInvestment && amount < deal.minInvestmentAmount) {
      return res.status(400).json({ message: "Amount should be more than minimum investment amount" });
    }
    
    // If modifying investment
    if (existingInvestment) {
      // Calculate remaining investment after modification
      const remainingInvestment = Number(existingInvestment.investmentAmount) + Number(amount);
      // Taking out entire money
      if (remainingInvestment === 0) {
        // Remove existing investment
        await prisma.investorDeals.delete({
          where: {
            dealId: deal.id,
            investorId: investor.id
          }
        });
        return res.status(200).json({ message: "Investment removed successfully" });
      }

      // Taking out some money
      if (remainingInvestment < existingInvestment.amount && remainingInvestment < deal.minInvestmentAmount) {
        return res.status(400).json({ message: "Remaining investment should be more or equal to minimum investment amount or be zero" });
      }

      // If adding money, then final amount should be less than or equal to money required
      if (amount > 0 && deal.targetAmount > remainingInvestment) {
        return res.status(400).json({ message: "Final amount should be less than or equal to required amount" });
      }

      // Update existing investment amount
      console.log(await prisma.investorDeals.update({
          where: {
            dealId_investorId: {
              dealId:deal.id,
              investorId:existingInvestment.investorId
            }
          },
          data: {
            investmentAmount: remainingInvestment
          }
        }));
        if(amount<0) return res.status(200).json({ message: "Money withdrawing was successfyll" });
        return res.status(200).json({ message: "Investment updated successfully" });
      } else {
        await prisma.investorDeals.create({
          data: {
          deal: {
            connect: {
              id: deal.id
            }
          },
          investor: {
            connect: {
              id: investor.id
            }
          },
          investmentAmount: amount
        }
      });

    }
    return res.status(200).json({ message: "Investment added successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
const verifyDeal = async (req, res) => {
  const data = req.body;
  
  try {
    let deal = await prisma.deal.update({
      where:{
        id:data.id.toString(),
      },
      data : {
        status: "OPEN",
      },
      
    });
    deal.id = deal.id.toString();
    console.log("Deal  ", deal);
    res.status(200).json(deal);
  } catch (e) {
    console.log("error in db ", e);
    res.status(402).json({ error: "Error verifying Deal" });
  }
};

module.exports = {
  addDeal,
  investDeal,
  verifyDeal
};
