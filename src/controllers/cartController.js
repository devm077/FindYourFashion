const { addToCartitems,addToCart,getCartItems,getTotalprice,removeItems } = require('../models/cartModel')
const authenticateUser=require('../middleware/authenticateUser')
const cartController={
    submitToCart:[authenticateUser,async(req,res)=>{
        if (!req.user) {
            return res.redirect('/clogin');
        }
        const {pid,wearsize,qty}=req.body
        
        const custid = req.user.custid;
       
        try{
            await addToCartitems(custid,pid,wearsize,qty)
            await addToCart(custid)
            res.redirect('/chome')
        }
        catch(error){
            console.error('Error in submitting cart details')
            res.status(500).send('Internal Server Error')
        }
    }],
    displayCart:[authenticateUser, async (req, res) => {
        if (!req.user) {
            return res.redirect('/clogin');
        }
        try {
            const custid = req.user.custid;
            const cartDetails = await getCartItems(custid)
            const totalprice=await getTotalprice(custid)
            res.render('cart', { cartDetails,totalprice });
        } catch (error) {
            console.error('Error in fetching cart Details:', error.message);
            res.status(500).send('Internal server error');
        }
    }],
    removeItems:[authenticateUser,async(req,res)=>{
        if (!req.user) {
            return res.redirect('/clogin');
        }
        const {pid}=req.body
        
        const custid = req.user.custid;
       
        try{
        
            await removeItems(custid,pid)
            await addToCart(custid)
            
            const cartDetails = await getCartItems(custid)
            const totalprice=await getTotalprice(custid)
            res.render('cart', { cartDetails,totalprice });
            
        }
        catch(error){
            console.error(`error removing product ${pid}`)
            res.status(500).send('Internal Server Error')
        }
    }]
}

module.exports=cartController