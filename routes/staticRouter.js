const express=require("express");
const router=express.Router();
const User=require("../models/usercreate");
const {setUser,getUser}=require("../services/auth");
const{checkForAuthentication}=require("../middlewares/auth");
const cookieParser=require("cookie-parser");
const jwt=require('jsonwebtoken');
const Task=require("../models/tasks");

router.get("/",(req,res)=>{
    return res.render("home");
});

router.get("/signup",(req,res)=>{
    return res.render("usersignup");
});

router.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,email,password
    });
    return res.redirect("/login");
});

router.get("/login",checkForAuthentication,async (req,res)=>{
    const user=req.user;
    if(user){
        return res.redirect("/");
    }
    else{
        return res.render("userlogin");
    }
});

router.post("/login",async (req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render("userlogin",{
            error:"Invalid E-mail or Password",
        });
    }

    //use setUser to get a token in return
    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/userportal");
});

router.get("/userportal",(req,res)=>{
    const token=req.cookies.uid;
    if(!token){
        console.log("token not found");
        return res.redirect("/login");
    }
    
    jwt.verify(token,"key",async (err,decoded)=>{
        const id=decoded.email;
        const tasks = await Task.find({email:id});
        const user=await User.findOne({email:id});
        return res.render("userportal",{user,tasks});
    });
});
    
router.post("/createTask",async (req,res)=>{
    const {email,taskName,taskBody,deadline,status}=req.body;
    console.log(email,taskName,taskBody,deadline,status);
    await Task.create({
        email,
        taskName,
        taskBody,
        deadline,
        status,
    });
    return res.redirect("/userportal");
});

// router.post("/user/update",async (req,res)=>{
//     const { MongoClient } = require('mongodb');
//     const{email,taskName,deadline}=req.body;

// async function updateDocument() {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         // Connect to the MongoDB client
//         await client.connect();
//         console.log('Connected to the database');

//         const db = client.db('tinkererlab');
//         const collection = db.collection(tasks);

//         const filter = { email:email, taskName:taskName, deadline:deadline };
//         const update = {
//             $set: {
//                 status: 'Completed' 
//             }
//         };

//         const result = await collection.updateOne(filter, update);
//     } catch (error) {
//         console.error('Error occurred while updating the document:', error);
//     } finally {
//         // Ensure the client is closed
//         await client.close();
//     }
// }
// updateDocument();
// return res.redirect("/userportal");
// });

module.exports=router;