const prisma = require('../../db')

const hasActiveDeal = async (req, res, next) => {
    try {
        const seller = await prisma.seller.findFirst({
            where: {
                id: req.seller.id,
                deals: {
                    some: {
                        NOT: {
                            status: {
                                in: ["CANCELLED", "CLOSED"]
                            }
                        }
                    }
                }
            }
        })

        if(seller){
            console.log("Seller has an active Deal, can't be deleted")
            res.status(200).json({error: "Seller has an active Deal, can't be deleted"})
        }
        else {
            next()
        }

        
    } catch (error) {
        console.log("Error while checking Seller deal's activity")

        res.status(400).json({error: "Error in Axios"})
    }
}

module.exports = {
    hasActiveDeal
}