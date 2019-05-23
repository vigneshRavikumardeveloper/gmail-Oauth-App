const express=require('express');
const router=express.Router();
const passport=require('passport');

router.get('/login',(req,res)=>{
    console.log('Login Route...');
    res.render('login',{user:req.user});
});

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res) => {
    console.log(`You reached te callback URI.`);
    res.redirect('/profile');
});

router.get('/logout',(req,res)=>{
    console.log('Logout Route...');
    req.logOut();
    res.redirect('/');
});

console.log(`auth-routes up`);

module.exports=router;

console.log(`auth-routes down`);