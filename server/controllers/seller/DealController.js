const addDeal = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error adding new Deal: ", error)

        res.status(402).json({error: "Error adding new Deal"})
    }
}