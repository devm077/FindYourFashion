const pool=require('../config/db')

const sharp = require('sharp')

const getMenTshirts=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Men' and wear='T-Shirts')) and stock.pid=images.pid`);

        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching men Tshirts:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getMenFormalshirts=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Men' and wear='Formal Shirts')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getMenShoes=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Men' and wear='Shoes')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getMenJeans=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Men' and wear='Jeans')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getWomenSarees=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Women' and wear='Sarees')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getWomenEthnicwear=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Women' and wear='Ethnic Wear')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getWomenFootwear=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Women' and wear='Footwear')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getWomenBags=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='Women' and wear='Bags')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getBoysTshirts=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='boys' and wear='T-Shirts')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getBoysJeans=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='boys' and wear='Jeans')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getBoysEthnicwear=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='boys' and wear='Ethnic Wear')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getGirlsEthnicwear=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='girls' and wear='Ethnic Wear')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getgirlsFrock=async()=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`SELECT filename,price,stock.pid FROM images,stock where stock.pid in (select pid from stock where fid=(select fid from filter where category='girls' and wear='Frock')) and stock.pid=images.pid`);
        
        return rows.map(row => ({ filename: row.filename, price: row.price,pid:row.pid}))
    
    } catch (error) {
        console.error('Error fetching image filenames:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const getProductDetails=async(productid)=>{
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`select filename,price,wname,stock.pid from images,stock where stock.pid= ? and images.pid=?`,[productid,productid]);
        return rows.map(row => ({filename: row.filename,price: row.price,wname: row.wname,pid: row.pid}))
    
    } catch (error) {
        console.error('Error fetching product Details:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



module.exports={
    getMenTshirts,
    getBoysEthnicwear,
    getBoysJeans,
    getBoysTshirts,
    getGirlsEthnicwear,
    getMenFormalshirts,
    getMenJeans,
    getMenShoes,
    getWomenBags,
    getWomenEthnicwear,
    getWomenFootwear,
    getWomenSarees,
    getgirlsFrock,
    getProductDetails
}