const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {

        jwt.verify(token , process.env.JWTSECRET ,(error , decodedtoken)=>{

            if(error){

                console.log(error.message);
                res.redirect("/login")

            }else{
                console.log(decodedtoken)
                next()

            }
           
        })

    } else {
        res.redirect("/login");
    }
};


module.exports  = {requireAuth}