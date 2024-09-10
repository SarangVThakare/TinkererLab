const {getUser}=require("../services/auth");

function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    
    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);
    req.user=user;
    return next();
}

module.exports={checkForAuthentication};