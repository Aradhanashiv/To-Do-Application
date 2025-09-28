const { model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    profileImage: {
       type: String,
       default : 'uploads/img.png'
    },
    notesId: [
        { type: Schema.Types.ObjectId, ref: 'Note' }
    ]
}, {timestamps: true})

module.exports = model('User' , userSchema)