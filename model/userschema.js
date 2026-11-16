

const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose").default;

const userschema=new mongoose.Schema({
    email:{
        type: String,
        required: true,
    }

})

userschema.plugin(passportLocalMongoose)
const user= mongoose.model( "user", userschema)

module.exports = user;