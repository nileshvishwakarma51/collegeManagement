const jwt= require("jsonwebtoken");
const { JWTSECRET } = require("../config/config");

excludePath=["/student/login","/student"]
const authenticate= async (req, res, next) => {
   
    if(req.method==="POST" && excludePath.includes(req.path)){
        
        next()
    }else{
        
        if(req.headers.authorization)
    {
        req.headers.authorization= req.headers.authorization.replace("Bearer","").trim()    
    }
    else{
        return res.send("invalid1 token")
    }
    try{
        console.log(req.headers.authorization)
        let user= await jwt.verify(req.headers.authorization, JWTSECRET)
        console.log(user);
        next()
    }catch(err){
        console.log(err);
        res.send(err)
    }
    }
    
   
    
    


}
module.exports = {authenticate};