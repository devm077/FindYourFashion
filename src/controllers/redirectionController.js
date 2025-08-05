const authenticateUser=require('../middleware/authenticateUser')
const path=require('path')


const redirectionController={
    backToHome: [(req, res, next) => authenticateUser(req, res, () => next()), (req, res) => {
        if (!req.user) {
          return res.redirect('/');
        } else {
          return res.redirect('/chome');
        }
      }],
      clogin:(req, res) => {
        res.sendFile(path.join(__dirname, '..', '..','static', 'clogin.html'));
      },
      ty:(req, res) => {
        res.sendFile(path.join(__dirname, '..', '..','static', 'ty.html'));
      },
      chome:(req, res) => {
        res.render(path.join(__dirname, '..', '..','views', 'chome.ejs'));
      },
      cart:(req, res) => {
        res.render(path.join(__dirname, '..', '..','views', 'cart.ejs'));
      },
      checkout:(req, res) => {
        res.render(path.join(__dirname, '..', '..','views', 'checkout.ejs'));
      },
      addprod:(req, res) => {
        res.sendFile(path.join(__dirname, '..', '..','static', 'addprod.html'));
      }
}

module.exports=redirectionController