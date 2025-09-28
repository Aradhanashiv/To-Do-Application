const {Scehma, models, model, Schema} = require('mongoose')

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type : String,
        required: true
    },
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
   }]
}, {timestamps: true})

module.exports = model('Note' , noteSchema)