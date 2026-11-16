const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../model/listingschema.js");
 


main().then((res)=>{
    console.log("mongodb connectin stablish")
}).catch(err =>  console.log(err))


  async function main() {
     
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb')
} 

const initDB = async () => {
  await listing.deleteMany({});
 initData.data= initData.data.map(list => { 
    return{...list , owner :'6adfb96b272e172890aa8c29' }
  })
  await listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();