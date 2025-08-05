const {addToOrders,getCustomerDetails}=require('../models/ordersModel')
const authenticateUser=require('../middleware/authenticateUser')

const ordersController={
    submitAddress:[authenticateUser,async(req,res)=>{
        try{
            const {city,address,zip,state}=req.body
            const custid=req.user.custid
            await addToOrders(custid,address,city,state,zip)
            res.redirect('/ty')
        }
        catch(error){
            console.error('error in submitting delivery address details',error.message)
            res.status(500).send('internal server error')
        }
    }],
    getCustomer:[authenticateUser,async(req,res)=>{
        try{
           
            const custid=req.user.custid
            const customer=await getCustomerDetails(custid)
            res.render('checkout',{customer})
        }
        catch(error){
            console.error('error in submitting delivery address details',error.message)
            res.status(500).send('internal server error')
        }
    }]
}

module.exports=ordersController