
const express=require("express");
const router = express.Router()
const wrapasync = require("../util/wrapasync")

const passport = require("passport");
 const LocalStrategy= require("passport-local")
const {redirecturl}=require("../midelware")
const userController = require("../controller/user")


router.route("/singup")
.get( userController.singupform)
.post(userController.registeruser) 
//singup route

// login 
router.route("/login")
.get(userController.loginform)
.post( redirecturl,  passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.loginuser
   )



    //logout route
router.get("/logout", userController.logoutuser);


module.exports=router;
 