const prisma = require('../../db')

const getSellers = async (req, res) => {
    try {
        
        const sellerStatus = req.body.status
        const sellers = await prisma.seller.findMany({
            where: {
                status: sellerStatus
            },
        })

        const modifiedSellers = sellers.map(seller => {
            const { password, ...rest } = seller;
            return rest;
        });

        res.status(200).json({message: "Seller List Fetched Successfully", sellers: modifiedSellers})

    } catch (error) {
        console.log("Error Fetching Seller List: ", error)

        res.status(400).json({error: "Error Fetching Seller List"})
    }
}

module.exports = {
    getSellers
}