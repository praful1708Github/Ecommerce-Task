const ProdctModel = require('../Models/Product')

const GetProducts = async(req,res)=>{
    try {
        const products = await ProdctModel.find();
        return res.status(200).json({message:'Products fetched success',products})
        
    } catch (error) {
        return res.status(500).json({message:'Internal Server error'})
    }

}
module.exports = {
    GetProducts
}