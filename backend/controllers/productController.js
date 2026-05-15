const prisma = require("../config/prisma");

const getProducts = async(req,res)=>{

try{

const products=await prisma.product.findMany()

res.status(200).json(products)

}

catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}

module.exports={

getProducts

}