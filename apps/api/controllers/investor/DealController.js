const prisma = require('../../db')

const getAllDeals = async (req, res) => {
    try {

        let deals = await prisma.deal.findMany({
            where: {
                status: "OPEN"
            },
            include: {
                investors: true,
                seller: true
            }
        })

        deals.map( (deal)=>{
            deal.id = deal.id.toString();
            deal.investors = deal.investors?.map((v) => {
                v.dealId = v.dealId.toString()
                v.investorId = v.investorId.toString()
                return v;
            });
        })

        res.status(201).json({message: "Deals Fetched Successfully", data: deals })

    } catch (error) {
        console.log("Error Fetching Deals: ", error)

        res.status(400).json({error: "Error Fetching Deals"})
    }
}

const getAllInvestedDeals = async (req, res) => {
    try {
        let investedDeals = await prisma.investorDeals.findMany({
            where: {
                investorId: req.investor.id
            }
        })
        console.log(investedDeals)

        investedDeals.map((deal)=>{
            deal.dealId = deal.dealId.toString()
        })

        res.status(200).json({message: "Invested Deals fetched successfully", data: investedDeals })

    } catch (error) {
        console.log("Error Fetching Invested Deals: ", error)

        res.status(400).json("Error Fetching Invested Deals")
    }
}

module.exports = {
    getAllDeals,
    getAllInvestedDeals
}