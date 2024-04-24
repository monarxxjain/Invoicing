const prisma = require("../db");

const getAllDeals = async (req, res) => {
    try {

        const status = req.body.status
        let deals;
        const today = new Date()

        if(status == "OPEN") {
            deals = await prisma.deal.findMany({
                where: {
                    status: "OPEN",
                    freezingDate: {
                        gt: today
                    }
                },
                include: {
                    investors: true,
                    seller: true
                }
            })
        }
        else if(status == "TO_BE_FREEZED"){
            deals = await prisma.deal.findMany({
                where: {
                    status: "OPEN",
                    freezingDate: {
                        lte: today
                    }
                },
                include: {
                    investors: true,
                    seller: true
                }
            })
        }

        else {

            deals = await prisma.deal.findMany({
                where: {
                    status: status
                },
                include: {
                    investors: true,
                    seller: true
                }
            })
        }
        

        deals.map( (deal)=>{
            deal.id = deal.id.toString();
            deal.investors = deal.investors?.map((v) => {
                v.dealId = v.dealId.toString()
                v.investorId = v.investorId.toString()
                return v;
            });
        })

        console.log(`${status} Deals Fetched Successfully`)

        res.status(201).json({message: `${status} Deals Fetched Successfully`, data: deals })

    } catch (error) {
        console.log("Error Fetching Deals: ", error)

        res.status(400).json({error: "Error Fetching Deals"})
    }
}

const updateDealStatus = async (req, res) => {
    try {
        
        const deal = await prisma.deal.update({
            where: {
                id: req.body.id
            },
            data: {
                status: req.body.status
            }
            
        })

        if(req.body.status == "OPEN") {
            const deal = await prisma.deal.update({
                where: {
                    id: req.body.id
                },
                data: {
                    currentAmount: req.body.currentAmount
                }
            })
        }

        res.status(200).json({message: `Deal ${req.body.status} Successfully !!`})
    } catch (error) {
        console.log("Error Updating Deal Status: ", error)

        res.status(400).json({error: "Error Updating Deal Status"})
    }
}

module.exports = {
    getAllDeals,
    updateDealStatus
}