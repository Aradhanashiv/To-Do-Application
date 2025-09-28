const express = require('express')
const route = express.Router()
const {handleCreateNote, handleUpdateNote, handleDeleteNote} = require('../controllers/noteController')
const authenticateToken = require('../middlwares/authentication')
const NoteModel = require('../models/NoteModel')
const userRoute = require('../models/userModel')

route.get('/home' , authenticateToken , (req,res)=>{
    res.send('Note App')
})

route.get('/get-all-notes' , async(req,res)=>{
  const allNotes =await NoteModel.find()
  res.json(allNotes)
})

route.get('/getNotes-CreatedBy' , async(req,res)=>{
  const allNotes =await NoteModel.find().populate("createdBy")
  res.json(allNotes)
})

route.get('/all-users' , async(req,res)=>{
  const allUsers = await userRoute.find()
  res.json(allUsers)
})

route.get('/user-profile/:id' ,authenticateToken, async(req,res)=>{
    const userId = req.params.id
    const userProfile = await userRoute.findById(userId)
    const notes = await NoteModel.find({createdBy : userId}).populate("createdBy")
    res.json({notes,userProfile})

})

route.post('/create-note' ,authenticateToken, handleCreateNote)

route.post('/update-note/:id' ,authenticateToken, handleUpdateNote)

route.post('/delete-note/:id',authenticateToken, handleDeleteNote)

module.exports = route