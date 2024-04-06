const prisma = require('../../db')

const getAllDeals = async (req, res) => {
    try {

        const deals = await prisma.deal.findMany()

        deals.map((deal)=>{
            deal.id = deal.id.toString();
            deal.investors = deal.investors?.map((v) => {
                return { dealId: v.dealId.toString(), investorId: v.investorId };
            });
        })

        res.status(201).json({message: "Deals Fetched Successfully", data: deals})

    } catch (error) {
        console.log("Error Fetching Deals: ", error)

        res.status(400).json({error: "Error Fetching Deals"})
    }
}

module.exports = {
    getAllDeals
}