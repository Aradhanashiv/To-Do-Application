const mongoose = require('mongoose')

const connectMongoDB = async() => {
 try {
    await mongoose.connect(process.env.MONGO_URL) 
    console.log('MongoDB Atlas Connected');
    } catch (error) {
      console.log(error);
    }
}

module.exports = connectMongoDB