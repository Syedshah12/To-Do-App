const mongoose=require('mongoose');


const connection=async (req,res)=>{
try {
    const con=await mongoose.connect('mongodb://localhost:27017/Tasks',{
         useNewUrlParser: true 
    });
    console.log('connected to db');
} catch (error) {
    console.log(error);
}
}
connection();

module.exports=connection;