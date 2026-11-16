const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

if(process.env.NODE_ENV !== "production"){
require("dotenv").config()

}


const express=require("express");
 const ejsMate = require("ejs-mate");
 const app=express();
 const mongoose= require("mongoose");
 const methodOverride= require("method-override")
 const path= require("path")
 const expresserr = require("./expresserr");
 const listingrouter = require("./routes/listing")
 const reviewrouter= require("./routes/review")
 const session = require ("express-session")
const { MongoStore } = require("connect-mongo");
 const flash= require("connect-flash")
 const passport= require("passport")
 const LocalStrategy= require("passport-local")
 const user= require("./model/userschema")
 const userrouter= require("./routes/user")
 const pagerouter= require("./routes/page")


const dburl=process.env.ATLAS_DBURL

main().then((res)=>{
    console.log("mongodb connectin stablish")
}).catch(err =>  console.log(err))


  async function main() {
     
    await mongoose.connect(dburl)
} 

 
app.engine("ejs", ejsMate);
 app.set("veiw engine","ejs");
 app.set("views", path.join(__dirname,"/veiws"))
 app.use(express.static(path.join(__dirname,"/public")))
 app.use(methodOverride("_method"));
 app.use(express.urlencoded({extended:true}))


 const store = MongoStore.create({
    mongoUrl: dburl,
    crypto : {
      secret : process.env.SECRET,
    },
    touchAfter: 24*3600,
 })

 store.on("error", ()=>{
    console.log("err i session store " ,err);
 })

 const sessionOptions ={
   store,
   secret :  process.env.SECRET,
   resave : false,
    saveUninitialized : true,
    cookie : {
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }
 }

 app.use(session(sessionOptions))
 app.use(flash());
 app.use(passport.initialize())
 app.use(passport.session())
 passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())




 app.use((req,res,next)=>{
   res.locals.success = req.flash("success")
   res.locals.err = req.flash("err")
   res.locals.user=req.user;
   next();
 })


 app.use("/listings", listingrouter)
 app.use("/listings/:id/review" , reviewrouter)

 app.use("/term", pagerouter)
 app.use("/",userrouter)
 
app.get("/",(req,res)=>{
    res.redirect("/listings")
})



app.use((req, res ,next)=>{
   next( new expresserr(404, "page not found"))
})


app.use((err, req,res ,next)=>{
   const {statuscode = 404 , message = "this is error"} = err;
   res.status(statuscode).render("error.ejs" ,{message})
   
}
)


 app.listen(8080, ()=>{
    console.log("request was listening")
 })