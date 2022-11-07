const mongoose=require("mongoose");

const blogSchema=mongoose.Schema({
	email:String,
	title:String,
	category:String,
	author:String,
	content:String
})
const BlogModel=mongoose.model("article",blogSchema);

module.exports=BlogModel;