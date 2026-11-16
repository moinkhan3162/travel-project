 const listing = require("../model/listingschema")
 const review = require("../model/reviewschema")


module.exports.creatreview = async(req,res)=>{
      
     let re= new review(req.body.review)
     re.auther = req.user._id;
       let {id}= req.params
       
       let list= await listing.findById(id);
       list.review.push(re);

      await re.save()
      await list.save()
       req.flash("success", "review created successfuly")
     res.redirect(`/listings/${id}`)
}

module.exports.deletereview =  async (req ,res)=>{
   let {id,rid}= req.params;
   
   await review.findByIdAndDelete(rid)
   await listing.findByIdAndUpdate(id,{$pull: {review: rid }})
    req.flash("success", "review deleted successfuly")
   res.redirect(`/listings/${id}`)
}