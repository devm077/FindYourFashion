const { getMenTshirts, getBoysEthnicwear, getBoysJeans, getBoysTshirts, getGirlsEthnicwear, getMenFormalshirts, getMenJeans, getMenShoes, getWomenBags, getWomenEthnicwear, getWomenFootwear, getWomenSarees, getgirlsFrock, getProductDetails } = require('../models/displayModel');
const authenticateUser = require('../middleware/authenticateUser')


const displayController = {
    displayHomePage: async (req, res) => {
        try {

            const menTshirts = await getMenTshirts();
            const boysEthnicwear = await getBoysEthnicwear();
            const boysJeans = await getBoysJeans();
            const boysTshirts = await getBoysTshirts();
            const girlsEthnicwear = await getGirlsEthnicwear();
            const menFormalshirts = await getMenFormalshirts();
            const menJeans = await getMenJeans();
            const menShoes = await getMenShoes();
            const womenBags = await getWomenBags();
            const womenEthnicwear = await getWomenEthnicwear();
            const womenFootwear = await getWomenFootwear();
            const womenSarees = await getWomenSarees();
            const girlsFrock = await getgirlsFrock();
            authenticateUser(req, res, async () => {
                if (req.user) {
                    res.render('chome', {
                        menTshirts, boysEthnicwear, boysJeans, boysTshirts, girlsEthnicwear,menFormalshirts, menJeans, menShoes, womenBags, womenEthnicwear,womenFootwear, womenSarees, girlsFrock
                    });
                } else {

                    res.render('index', {
                        menTshirts, boysEthnicwear, boysJeans, boysTshirts, girlsEthnicwear,menFormalshirts, menJeans, menShoes, womenBags, womenEthnicwear,womenFootwear, womenSarees, girlsFrock
                    });
                }
            });
        } catch (error) {
            console.error('Error in fetching category data:', error.message);
            res.status(500).send('Internal server error');
        }
    },

    displayProduct: async (req, res) => {
        try {
            const productid = req.params.pid.replace(':', '')
            const productDetails = await getProductDetails(productid)
            res.render('pro', { productDetails });
        } catch (error) {
            console.error('Error in fetching Product Details:', error.message);
            res.status(500).send('Internal server error');
        }
    }
};

module.exports = displayController;
