const express=require('express');
const router=express.Router();

const authLogin=(req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login');
    }
    else{
        next();
    }
}

router.get('/',authLogin,(req,res)=>{
    console.log(`Profile Route...`);
    res.render('profile',{ user:req.user });
});

module.exports=router;