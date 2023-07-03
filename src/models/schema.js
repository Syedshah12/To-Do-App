const mongoose=require('mongoose');

const mySchema=new mongoose.Schema({
number:{
type: Number,
unique:true
},
name:{
    type:String,
},

date:{
    type:String,
}
})

const Task =new mongoose.model('Task',mySchema);

module.exports=Task;