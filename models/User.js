const mongoose = require("mongoose");



const userschema = mongoose.Schema({

    email : {

        type : String,
        required: true,
        unique : true,
        lowercase : true

    },
    password: {
        type : String,
        required : true,
        minLength : 6,



    }



})

    const User = mongoose.model("users" , userschema)


module.exports = User