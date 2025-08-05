const pool=require('../config/db')

const addProd=async(price,Sqty,Mqty,Lqty,XLqty,filename,mimetype,size,wname,category,wear)=>{
    let connection
    
    try{
        connection=await pool.getConnection()
        let fid
        let filterResult=[]
        const checkIfExistsquery = `
            SELECT COUNT(*) as count FROM filter 
            WHERE category = ? AND wear = ?`;
        const [result] = await connection.execute(checkIfExistsquery, [category, wear]);
        const combinationExists = result[0].count > 0;
        const addToStockquery=`insert into stock (fid,price,wname) values (?,?,?)`
        const addToImagesquery=`insert into images (pid,filename, mimetype, size) values (?,?, ?, ?)`
        const addToFiltersquery=`insert into filter (category,wear) values (?,?)`
        const addToSizequery=`insert into size (pid,wearsize,pqty) values (?,?,?),(?,?,?),(?,?,?),(?,?,?)`

        await connection.beginTransaction()
        if(!combinationExists){

            [filterResult]=await connection.execute(addToFiltersquery,[category,wear]) 
            fid=filterResult.insertId;
        }
        else{
            [filterResult]=await connection.execute(`select fid from filter where category=? and wear=?`,[category,wear])
        
            fid=filterResult[0].fid
        }
        
        const [stockResult]=await connection.execute(addToStockquery,[fid,price,wname])
        const pid=stockResult.insertId
        
        await connection.execute(addToImagesquery,[pid,filename,mimetype,size])
    
        await connection.execute(addToSizequery,[pid,'S',Sqty,pid,'M',Mqty,pid,'L',Lqty,pid,'XL',XLqty])
    
        await connection.commit()
    }
    catch(error){
        if(connection){
            await connection.rollback()
        }
        console.log("could not add product",error.message)
        throw error
    }
    finally{
        connection.release()
    }
}

const getcredentials=async(admin_id,password)=>{
    let connection
    try{
         connection = await pool.getConnection()
        let [credentials]=await connection.execute(`select admin_id,password from admin where admin_id=? and password=? `,[admin_id,password])
         return credentials
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
    addProd,
    getcredentials
}
