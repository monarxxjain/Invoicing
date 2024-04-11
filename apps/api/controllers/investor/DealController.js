const prisma = require('../../db')


const getAllInvestedDeals = async (req, res) => {
    try {
        let investedDeals = await prisma.investorDeals.findMany({
            where: {
                investorId: req.investor.id
            },
            include : {
                deal : {
                    include : {
                        seller:true
                    }
                }
            }
        })
        
        investedDeals?.map((deal)=>{
            deal.dealId = deal.dealId.toString()
            deal.deal.id = deal.deal.id.toString()
        })

        console.log("Invested Deals fetched successfully")
        
        res.status(200).json({message: "Invested Deals fetched successfully", data: investedDeals })

    } catch (error) {
        console.log("Error Fetching Invested Deals: ", error)

        res.status(400).json("Error Fetching Invested Deals")
    }
}

module.exports = {
    getAllInvestedDeals
}