 const listing =require("../model/listingschema");
 const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
 const maptoken= process.env.MAP_TOKEN;
 const geocodingClient = mbxgeocoding({ accessToken: maptoken});


module.exports.indexpage= async(req,res ,next)=>{
     let {category, location}= req.query
    
      
     let lists;
     if(category){
         lists= await listing.find({category :category})
        if(lists.length < 1){
            req.flash("err" , "this category is not availiable")
           return res.redirect("/listings")
        }
     }
      else if(location){
       lists= await listing.find({location : location})
       if(lists.length < 1){
            req.flash("err" , "hotel is not availiable for this location")
           return res.redirect("/listings")
        }
     }
     else{
         lists= await listing.find();
     }
   
    res.render("./listing/home.ejs",{lists})
}

module.exports.listingform=(req,res)=>{
    
    res.render("./listing/new.ejs")
}

module.exports.showlisting= async(req,res)=>{
    
    let {id}= req.params;
    let list= await listing.findById(id).populate({
      path : "review",
      populate: {
        path : "auther"
      }
    })
    .populate("owner")
    if(!list){
        req.flash("err", " this list is not exist") 
        return res.redirect("/listings")
    }
    res.render("./listing/show.ejs", {list})
}


module.exports.creatnewlisting = async (req,res)=>{
    let response= await geocodingClient.forwardGeocode({
  query:req.body.listing.location ,
  limit: 1
})
  .send()


    let url = req.file.path
    let filename = req.file.filename

   let list = new listing(req.body.listing)
   list.image ={url,filename}
    list.owner = req.user._id;
     list.geometry = response.body.features[0].geometry
     await list.save();
    req.flash("success", "listing created successfuly")
    res.redirect("/listings")
    
}


module.exports.updateform = async(req,res)=>{
     let {id} = req.params;
     let list=await listing.findById(id);
    let orignalurl= list.image.url.replace("/upload", "/upload/h_150,w_150")
     if(!list){
        req.flash("err", "this list is not exist")
      return  res.redirect("/listings")
     }
     res.render("./listing/update.ejs", {list, orignalurl})
}

module.exports.updatelisting = async(req,res)=>{
     
    let {id}= req.params;
  
     
    let updatedlist= req.body.listing;
    if( typeof req.file !== "undefined"){
        let url = req.file.path
        let filename = req.file.filename
        updatedlist.image = {url, filename}
    }
    await listing.findByIdAndUpdate(id, updatedlist,{runValidators:true})
     req.flash("success", "listing updated successfuly")
    res.redirect(`/listings/${id}`)
} 

module.exports.deletelisting = async(req,res)=>{
    let {id}= req.params;
     await listing.findByIdAndDelete(id);
      req.flash("success", "listing deleted successfuly")
     res.redirect("/listings");
}
