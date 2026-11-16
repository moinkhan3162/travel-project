const express=require("express");
const router = express.Router({mergeParams : true})
 

 
 const wrapasync = require("../util/wrapasync")
 const {validatereview, checklogin ,checkreviewoner}= require("../midelware")
 const reviewController= require("../controller/review")



// review creating rout
router.post("/",  checklogin, validatereview, wrapasync(reviewController.creatreview))

// review delete route
router.delete("/:rid",checklogin, checkreviewoner,wrapasync( reviewController.deletereview))

module.exports = router;