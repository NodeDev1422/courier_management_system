const JWT = require("jsonwebtoken");

const auth = (req,res,next)=>{
try{
    let authToken = req.headers['authorization'];
    if(!authToken)
    {
        return res.send({ msg:"Authorization token not found.",data:{} });
      //  next();
    }
    let [bearer,token] = authToken.split(" "); 
    if(!token){
        return res.send({ msg:"Invalid Token.",data:{} });
    }

    const verifyToken = JWT.verify(token,'123456');
    req.customerDetails = verifyToken;
    next();

}catch(err)
{
    return res.send({ msg:"Invalid Token.",data:{} });
}
    
};



module.exports = {auth};