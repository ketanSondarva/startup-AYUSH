const mongoose = require("mongoose")

//database
const registerSchema = new mongoose.Schema( {
    usertype : {
        type:String
    },

    name : {
        type:String
    },

    occupation : {
        type:String
    },
    email : {
        type:String,
        unique:true
    },
    phone : {
        type:Number,
        unique:true
    },
    password : {
        type:String
    },
    confirmpass : {
        type:String
    },
    gender : {
        type:String
    }
})

//collection 
const Register = new mongoose.model("Register", registerSchema)

module.exports = Register
   