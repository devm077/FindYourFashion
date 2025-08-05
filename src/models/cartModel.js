const pool = require('../config/db')

const addToCartitems = async (custid,pid, wearsize, qty) => {
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction()
        const [price_per_item]=await connection.execute(`select price from stock where pid=?`,[pid])

       
        await connection.execute(`insert into cart_items (custid,pid,wearsize,qty,price_per_item) values (?,?,?,?,?)`, [custid,pid, wearsize, qty,price_per_item[0].price])
        await connection.execute(`update cart_items set amount=price_per_item*qty where custid=?`,[custid])
       await connection.commit()
    } catch (error) {
        await connection.rollback()
        console.error('Error adding to cart items', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const addToCart = async (custid) => {
    let connection;
    
    try {
        connection = await pool.getConnection();
        let totalprice=0
        const [rows]=await connection.execute(`select amount from cart_items where custid=?`,[custid])
     
        for (let i = 0; i < rows.length; i++) {
       
             totalprice += (rows[i].amount)
            
        }
        totalprice = parseInt(totalprice)
        let [results]=await connection.execute(`select count(*) as count from cart where custid=? `,[custid])
        const cartExists=results[0].count >0
        if(cartExists){
            await connection.execute(`delete from cart where custid=?`,[custid])
        }
    
            await connection.execute(`insert into cart (custid,totalprice) values (?,?)`, [custid,totalprice])
        

    } catch (error) {
        console.error('Error adding to cart', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getCartItems=async(custid)=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const productquery=`select qty,category,wear,cart_items.pid,filename,price_per_item,wearsize,amount from cart,cart_items,images,filter where cart_items.pid=images.pid and cart_items.custid=? and filter.fid=(select fid from stock where stock.pid=cart_items.pid and cart_items.custid=?)`
        const [rows] = await connection.execute(productquery,[custid,custid]);
        
        return rows.map(row => ({qty:row.qty,category:row.category,wear:row.wear,filename:row.filename,pid:row.pid,price_per_item:row.price_per_item,wearsize:row.wearsize,amount:row.amount}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getTotalprice=async(custid)=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const pricequery=`select totalprice from cart where custid=?`
        const [rows] = await connection.execute(pricequery,[custid]);
        
        return rows.map(row => ({ totalprice: row.totalprice}))
    
    } catch (error) {
        console.error('Error fetching totalprice', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const removeItems=async(custid,pid)=>{
    let connection;

    try {
        console.log(pid)
        connection = await pool.getConnection();
        await connection.execute(`delete from cart_items where custid=? and pid=?`,[custid,pid])
        await connection.execute(`delete from cart where custid=?`,[custid])
       
    
    } catch (error) {
        console.error('Error removing item', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



module.exports={
    addToCart,
    addToCartitems,
    getCartItems,
    getTotalprice,
    removeItems
}