const {addProd,getcredentials}=require('../models/adminModel')

const adminController={
    submitProduct:async(req,res)=>{
        const {wname,category,wear,Sqty,Mqty,Lqty,XLqty,price}=req.body
        const {filename,mimetype,size}=req.file
        try{
            await addProd(price,Sqty,Mqty,Lqty,XLqty,filename,mimetype,size,wname,category,wear)
            res.redirect('/addprod')
        }
        catch(error){
            console.error('error in submitting product',error.message)
            res.status(500).send('internal server error')
        }
    },
    verifyAdmin:async(req,res)=>{
        const {admin_id,password}=req.body
        try{
            const results=await getcredentials(admin_id,password)
            if(results.length===1){
                req.session.admin = {
                    admin_id: results[0].admin_id,
                    password: results[0].password
                };
                console.log('verification successful')
                res.redirect('/addprod')
            }
            else{
                res.status(401).send('invalid credentials')
            }
        }
        catch(error){
            console.error('error executing query',error)
            res.status(500).send('internal server error')
        }
    }
}




module.exports=adminController