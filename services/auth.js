const jwt=require('jsonwebtoken');
const secret="key";
//sending complete object
function setUser(user){
    //payload is complete user
    return jwt.sign({
        email:user.email,
        password:user.password
    },secret);
}

//the user which gives token
function getUser(token){
    if(!token){
        return null;
    }
    //for not crashing server, when anything is error with token.
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}

module.exports={
    getUser,setUser,
};