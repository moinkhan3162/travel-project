 const listing = require("./model/listingschema") 
 const expresserr = require("./expresserr");
  const {validation,reviewvalidation} = require("./util/schema");

const review= require("./model/reviewschema");




module.exports.checklogin= (req,res , next)=>{
   if(!req.isAuthenticated()){
        req.flash("err","please login first")
        req.session.redirecturl = req.originalUrl
       
      return  res.redirect("/login")
    }
    next();
}


module.exports.redirecturl= (req,res,next)=>{
    res.locals.url =  req.session.redirecturl 
    next();
}

module.exports.checkowner= async(req,res,next)=>{
   let {id} = req.params;
     let list=await listing.findById(id);
   if(!list.owner.equals(req.user._id)){
        req.flash("err", "you are not owner of this list")
      return  res.redirect(`/listings/${id}`)
     }
     next();
}


module.exports.validatelisting= (req,res,next)=>{
    const {error}= validation.validate(req.body)
    if(error){
        throw new expresserr(404,error)
    }else{
    next();
    }
}


 module.exports.validatereview = (req ,res ,next)=>{
    const {error} = reviewvalidation.validate(req.body)
    if(error){
        throw new expresserr(404, error)
    }else{
        next();
    }
 }

 module.exports.checkreviewoner= async(req,res,next)=>{
 let {id,rid}= req.params;
 let reviews= await review.findById(rid)
   if(!reviews.auther.equals(req.user._id)){
    req.flash("err", "you cannot delete this review")
    return res.redirect(`/listings/${id}`)
   }
   next();
 }