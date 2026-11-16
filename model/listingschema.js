const mongoose= require("mongoose")
 const review = require("../model/reviewschema")
const { string, required } = require("joi")

const listingschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image:{
        url:String,
        filename:String
        
    },
    price:{
      type:Number,
      min:500,

    },
    location:{
        type:String
    },
    country:{
       type:String

    },
    review : [
        {
            type : mongoose.Types.ObjectId,
            ref : "review"
        }
    ],
    owner:{
        type : mongoose.Types.ObjectId,
        ref:"user"
    },
    geometry:{
        type :{
            type : String,
            enum:['Point'],
            required: true
        },
        coordinates: {
            type :[Number],
            required: true,
        }
    },
    category : {
        type: String,
        enum: ["trendings","luxary hotels","3 star hotels", " sea view", "mountains", "boating", "snow cities" ,"prime cities"],
        required:true,
    }
})

listingschema.post("findOneAndDelete" , async(list)=>{
    if(list.review.length){
        await review.deleteMany({_id : {$in: list.review}})
    }
   
})

const listing = mongoose.model("listing", listingschema);
 
module.exports = listing;
