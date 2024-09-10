const mongoose=require('mongoose');
async function connectToMongoDB(url){
    console.log("MongoDB Connected...");
    return mongoose.connect(url);
}
module.exports={connectToMongoDB};