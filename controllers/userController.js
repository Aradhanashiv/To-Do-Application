const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const handleCreateUser = async(req,res)=>{
try {
 const{name, email, password} = req.body
 if(!name || !email || !password){
    return res.status(400).send({success: false, message: 'All fields are Required'})
 }
  const isExistingUser = await userModel.findOne({email})
  if(isExistingUser){
     return res.status(403).send({success: false, message: 'User Already Exists'})
  }  
  const hashedPass = await bcrypt.hash(password, 10)
  const profileImage = (req.file) ? `/uploads/${req.file.filename}` : `/uploads/img.png`

   const user = await userModel.create({
    name,
    email,
    password: hashedPass,
    profileImage
  })
  const token = JWT.sign({id : user._id} , process.env.SECRET_KEY)
  res.cookie("token" , token)
  return res.status(201).send({success: true, message: 'User created successfully'})
  } catch (error) {
   console.log(error);
   return res.status(500).send({success: false, message: 'Internal Server Error'})
  }
}

const handleLogin = async(req,res)=>{
try {
   const{email, password} = req.body
   if(!email || !password){
    return res.status(400).send({success: false, message: 'All fields are Required'})
   }
   const user = await userModel.findOne({email})
   if(!user){
     return res.status(404).send({success: false, message: 'User Not Exists'})
   }
   const isValid = await bcrypt.compare(password, user.password)
   if(!isValid){
    return res.status(400).send({success: false, message: 'Password is Wrong'})
   }
   const token = await JWT.sign({_id: user._id} , process.env.SECRET_KEY, {expiresIn : "7d"})
   res.cookie('token' , token, {
      httpOnly: true,
      maxAge: 7*24*60*60*1000
   })
   return res.status(200).send({success: true, message: 'User Login successfully' , user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
     
   }})
  } catch (error) {
   console.log(error);
   return res.status(500).send({success: false, message: 'Internal Server Error'})
 }  
}


module.exports = {handleCreateUser,handleLogin} 