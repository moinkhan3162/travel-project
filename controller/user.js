const user = require("../model/userschema");


module.exports.singupform= (req,res)=>{
    res.render("./user/singup.ejs")
}

module.exports.registeruser = async(req,res)=>{
    try{
       let {username , email, password} = req.body;
    let user1= user({ username, email})
   let registeruser=await user.register(user1, password)
   req.logIn(registeruser , (err)=>{
    if(err){
        return next(err)
    }
     req.flash("success" ,"user register successfully")
   res.redirect("/listings")

   })
    }catch(e){
        req.flash("err" , e.message)
        res.redirect("/singup")
    }
}

module.exports.loginform =  (req,res)=>{
  res.render("./user/login.ejs")
}

module.exports.loginuser =  (req , res)=>{
       req.flash("success" , "welcome to airbnb")
       let redirecturl= res.locals.url || "/listings";
        res.redirect(redirecturl)
       
    }

module.exports.logoutuser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout successfully");
        res.redirect("/listings");
    });
}