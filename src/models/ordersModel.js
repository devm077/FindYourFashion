const pool=require('../config/db')

const addToOrders=async (custid,address,city,state,zip)=>{
    let connection
    try{
        connection=await pool.getConnection()
        await connection.beginTransaction()
        let [rows]=await connection.execute(`select totalprice from cart where custid=?`,[custid])
        let totprice=rows[0].totalprice
        let [orders]=await connection.execute('insert into orders (oid,totprice,odate,custid,address,city,state,zip)values (default,?,curdate(),?,?,?,?,?) ',[totprice,custid,address,city,state,zip]) 
        let oid=orders.insertId
        let [cartitems]=await connection.execute(`select * from cart_items where custid=?`,[custid])
        for (let items of cartitems) {
            await connection.execute(`insert into order_items (oid,pid,qty,price_per_item,wearsize,amount) values (?,?,?,?,?,?)`,[oid,items.pid,items.qty,items.price_per_item,items.wearsize,items.amount])
            await connection.execute(`update size set pqty=pqty-? where pid=? and wearsize=?`,[items.qty,items.pid,items.wearsize])
        }
        await connection.execute(`delete from cart where custid=?`,[custid])
        await connection.execute(`delete from cart_items where custid=?`,[custid])

        await connection.commit()
    }
    catch(error){
        if(connection){
            await connection.rollback()
        }
        console.error('error in adding orders',error.message)
        throw error
    }
    finally{
        connection.release()
    }
}
const getCustomerDetails=async(custid)=>{
    let connection
    try{
        connection=await pool.getConnection()
        const [rows]=await connection.execute(`select fname,lname,mail from customer where custid=?`,[custid])
        return rows.map(row=>({fname:row.fname,lname:row.lname,mail:row.mail}))
    }
    catch(error){
        console.error('error in fetching customer details',error.message)
        throw error
    }
    finally{
        connection.release()
    }
}

module.exports={
    addToOrders,
    getCustomerDetails
}

