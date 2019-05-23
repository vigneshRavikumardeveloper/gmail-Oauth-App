const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    username:String,
    googleId:String,
    thumbnail:String
});

const User=mongoose.model('user',userschema);

module.exports=User;