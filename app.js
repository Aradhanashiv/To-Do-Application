require('dotenv').config()
const express = require('express')
const connectMongoDB = require('./config/db')
const cookieParser = require('cookie-parser')
const noteRoute = require('./routes/NoteRoute')
const userRoute = require('./routes/userRoute')


const app = express()
const port = process.env.PORT || 8000

connectMongoDB()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api' , noteRoute)
app.use('/user' , userRoute)

app.listen(port , ()=>{
    console.log('server start');
})
