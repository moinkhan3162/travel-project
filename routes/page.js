const express=require("express");
 const router = express.Router();


 router.get("/" , (req,res)=>{
   res.render("./page/term.ejs")
 })

 
 router.get("/about" , (req,res)=>{
   res.render("./page/about.ejs")
 })

 module.exports=router