const {addToCustomers,verifyCredentials}=require('../models/customerModel')


const customerController={
    submitCustomer:async(req,res)=>{
        const {fname,lname,mobile,mail,gender,DOB,cuser,cpwd}=req.body
        try{
            await addToCustomers(fname,lname,mobile,mail,gender,DOB,cuser,cpwd)
            res.redirect('/clogin')
        }
        catch(error){
            console.error('Error in submitting customer details')
            res.status(500).send('Internal Server Error')
        }
    },
    verifyCustomer:async(req,res)=>{
        const {cuser,cpwd}=req.body
        try{
            const results=await verifyCredentials(cuser,cpwd)
            if(results.length===1){
                req.session.user = {
                    custid: results[0].custid,
                    username: cuser
                };
                console.log('verification successful')
                res.redirect('/chome')
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

module.exports=customerController