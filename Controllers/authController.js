


module.exports. signup_get = (req , res) =>{

        res.render('../views/signup.ejs')
    


}

module.exports.login_get = (req , res) =>{

    res.render('../views/login.ejs');



}

module.exports.signup_post = (req , res) =>{

    res.send("created")



}


module.exports.login_post = (req , res) =>{
   

    const body = req.body
    console.log(body)
    res.send('user_post');
    


}