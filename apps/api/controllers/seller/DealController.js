const prisma = require('../../db')
const addDeal = async (req, res) => {

            const data = req.body;
            console.log("data ",data);
            // id 16 digits, INV,
            const investors = data.investors.map((v)=>{return {'investor':{'connect':{id :v}}}})
            console.log(investors);
            try{
        
                let deal = await prisma.deal.create({
                  data: {
                    seller : {connect:{id:data.sellerId}}, 
                    targetAmount: data.targetAmount,
                    status: data.status,
                    dealAim: data.dealAim,
                    tentativeDuration: data.tentativeDuration,
                    profitPercent: data.profitPercent,
                    investors: { create : investors},
                  },
                  include: {
                    investors: true // Include the associated InvestorDeals in the returned Deal object
                  }
                });
                deal.id = deal.id.toString();
                deal.investors = deal.investors.map((v)=>{return{dealId:v.dealId.toString(),investorId:v.investorId}})
                console.log("Deal  ",deal);
                res.status(200).json(deal);
            }catch(e)
            {
                console.log("error in db ",e);
                res.status(402).json({ error: "Error adding new Deal" });
            }
}

module.exports = {
    addDeal
}