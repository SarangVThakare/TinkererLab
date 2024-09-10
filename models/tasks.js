const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    taskName:{
        type:String,
        required:true,
    },
    taskBody:{
        type:String,
    },
    deadline:{
        type:Date,
    },
    status:{
        type:String,
        default:'Pending',
        required:true,
    }
});

const Task=new mongoose.model("task",taskSchema);
module.exports=Task;