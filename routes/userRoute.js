const express = require('express')
const route = express.Router()
const {handleCreateUser, handleLogin} = require('../controllers/userController')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

route.get('/register' , (req,res)=>{
    res.send('Get Regiter Yourself')
})

route.post('/register' ,upload.single("profileImage"), handleCreateUser)

route.post('/login' , handleLogin)

module.exports = route