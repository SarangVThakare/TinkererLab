const express=require('express');
const {connectToMongoDB}=require("./connect.js");
const app=express();
const path=require('path');
const {checkForAuthentication}=require("./middlewares/auth");
connectToMongoDB('mongodb://127.0.0.1:27017/tinkererlab')
const staticRouter=require("./routes/staticRouter");
const cookieParser=require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkForAuthentication);
app.use(cookieParser());

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use("/",staticRouter);
app.get("/",(req,res)=>{
    return res.render('home');
});

app.listen(8000,()=>{
    console.log("Server is running successfully.");
});
