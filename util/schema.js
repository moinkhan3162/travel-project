const joi = require("joi")


const validation = joi.object({
    listing: joi.object({
      title : joi.string().required(),
    description: joi.string().required(),
    image: joi.string().allow("", null),
    price: joi.number().min(0).required(),
     location: joi.string().required(),
      country: joi.string().required(),

    }).required()
   
})


 const reviewvalidation = joi.object({
  review : joi.object({
    rating : joi.number().required().min(0).max(5),
    comment : joi.string().required()
  }).required()
})

module.exports= { validation, reviewvalidation}