const pool=require('../config/db')


const addToCustomers=async (fname,lname,mobile,mail,gender,DOB,cuser,cpwd)=>{
    let connection
    try{
        connection=await pool.getConnection()
        await connection.execute('insert into customer (custid,fname,lname,mobile,mail,gender,DOB,cuser,cpwd) values (default,?,?,?,?,?,?,?,?)',[fname,lname,mobile,mail,gender,DOB,cuser,cpwd]) 
    }
    catch(error){
        console.error('error in adding Customer',error.message)
        throw error
    }
    finally{
        connection.release()
    }
}

const verifyCredentials=async (cuser,cpwd)=>{
    let connection
    try{
        connection=await pool.getConnection()
       const [results]= await connection.execute(`select * from customer where cuser=? and cpwd=?`,[cuser,cpwd]) 
       return results;
    }
    catch(error){
        console.error('error in executing query ',error.message)
        throw error
    }
    finally{
        connection.release()
    }
}



module.exports={
    addToCustomers,
    verifyCredentials
}