const express=require('express')
const customerController=require('../controllers/customerController')
const adminController=require('../controllers/adminController')
const displayController=require('../controllers/displayController')
const cartController=require('../controllers/cartController')
const ordersController=require('../controllers/ordersController')
const redirectionController=require('../controllers/redirectionController')
const multer  = require('multer')
const router=express.Router()
const adminLogout=require('../middleware/adminLogout')
const userLogout=require('../middleware/userLogout')
const { upload } = require('../config/multerconfig')

//customer and admin logout
router.get("/admin-logout",adminLogout)
router.get("/user-logout",userLogout)


//customer login and register
router.post("/register/submit",customerController.submitCustomer)
router.post("/login/submit",customerController.verifyCustomer)

//admin stock management
router.post("/admin-login",adminController.verifyAdmin)
router.post("/admin/add-product/submit",upload.single('image'),adminController.submitProduct)

//display stock in home page
router.get("/",displayController.displayHomePage)
router.get("/chome",displayController.displayHomePage)

//checkout and orders
router.get("/checkout",ordersController.getCustomer)
router.post('/place-order',ordersController.submitAddress)

//display individual product
router.get("/product/:pid",displayController.displayProduct)

//cart management
router.post('/add-to-cart',cartController.submitToCart)
router.post('/remove-item',cartController.removeItems)
router.get('/view-cart',cartController.displayCart)

//redirections
router.get('/addprod',redirectionController.addprod)
router.get('/back-to-home',redirectionController.backToHome)
router.get('/clogin',redirectionController.clogin)
router.get('/chome',redirectionController.chome)
router.get('/cart',redirectionController.cart)
router.get('/ty',redirectionController.ty)
router.get('/checkout',redirectionController.checkout)

module.exports=router