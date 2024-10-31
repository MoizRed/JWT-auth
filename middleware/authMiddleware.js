const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/User");


//authorize the user to view the protected routes
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



//check current user

const checkUser =  (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWTSECRET, async (error, decodedtoken) => {
            if (error) {
                console.log(error.message);
                res.locals.user = null

            next()
            } else {
                console.log(decodedtoken);
                let user = await User.findById(decodedtoken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        console.log(res.locals)
        next();
    }
};

module.exports  = {requireAuth , checkUser}
