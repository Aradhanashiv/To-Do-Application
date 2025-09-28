const Note = require('../models/NoteModel')

const handleCreateNote = async(req,res) => {
   const {title, content} = req.body
   if(!title || !content) {
    return res.status(400).send({success: false, message: "All fields are Required"})
   } 
   try {
    const note =  await Note.create({
    title,
    content,
    createdBy : req.user._id
   })
   return res.status(200).send({success: true, message: "Note Created Successfully"},note)
   } catch (error) {
    console.log(error);
    return res.status(500).send({success: false, message: "Failed to Create Note"})
   }
}

const handleUpdateNote = async(req,res)=>{
   try {
   const noteId = req.params.id
   if(!noteId){
      return res.status(400).send({success: false, message: 'NoteID is not Valid'})
   }
   const { title, content} = req.body 
   const note = await Note.findByIdAndUpdate(noteId, {
      title: title,
      content: content  
   }, {new: true, runValidators: true})
   if(!note){
      return res.status(404).send({success: false, message: 'Note Not Found'})
   }
   return res.status(200).send({success: true, message: 'Note Updated Successfully'})
   } catch (error) {
      console.error("Update error:", error);
    return res.status(500).send({success: false, message: 'Internal Server Error'})  
   }
}

const handleDeleteNote = async(req,res)=>{
   const notesId = req.params.id
   if(!notesId){
      return res.status(400).send({success: false, message: 'Note Not Found'})
   }
   try {
   const DeletedNote = await Note.findByIdAndDelete(notesId) 
   if(!DeletedNote){
    return res.status(404).send({success: false, message: 'Note Not Deleted'})   
   }
   return res.status(200).send({success: true, message: 'Note Deleted Successfully'}) 

   } catch (error) {
      console.log(error)
   return res.status(500).send({success: false, message: 'Internal Server Error'})
   }
}  

module.exports = {handleCreateNote,handleUpdateNote,handleDeleteNote}     