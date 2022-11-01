const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
	userId:Number,
	noteId:Number,
	heading:{type:String,required:true},
	note:{type:String,required:true},
	tag:{type:String,required:true}
},
{
	versioKey:false
})

const NoteModel=mongoose.model("note",noteSchema);

module.exports=NoteModel