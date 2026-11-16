const express=require("express");
 const router = express.Router();
 const multer  = require('multer')
 const  {storage}=require("../config")
const upload = multer({ storage })



 const wrapasync = require("../util/wrapasync")

const { checklogin, checkowner,validatelisting } = require("../midelware");
const listingController=  require("../controller/listing");
const listing = require("../model/listingschema");

 
 
router.route("/")
.get(wrapasync(listingController.indexpage))
.post( checklogin, validatelisting, upload.single("listing[image]"),  wrapasync(listingController.creatnewlisting))
 

//creat new list render form
router.get("/new", checklogin, listingController.listingform)

//read rout
router.route("/:id")
.get(wrapasync(listingController.showlisting))
.put(checklogin,  checkowner,upload.single("listing[image]"), validatelisting,  wrapasync(listingController.updatelisting))
.delete( checklogin,  checkowner, wrapasync(listingController.deletelisting ))






//updating list

//rendering updatae form
router.get("/:id/update",  checklogin, checkowner, wrapasync(listingController.updateform));


// put rout


//delete list


module.exports= router;
