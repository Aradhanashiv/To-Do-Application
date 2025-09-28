const JWT = require('jsonwebtoken')

const authenticateToken = async(req,res,next) => {
      const token =  req.cookies['token']
       if(!token){
        return res.status(404).send({success: false, message: "User Not LoggedIn"})
       } 
       try {
        const decoded = await JWT.verify(token,process.env.SECRET_KEY)
        if(!decoded){
        return res.status(404).send({success: false, message: "Token is Not Valid"})         
        }
        req.user = decoded 
        next()
      } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, message: "Server Error"})     
      }
}

module.exports = authenticateToken