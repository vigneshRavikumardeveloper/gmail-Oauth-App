const express=require('express');
const app=express();
const cookiesession=require('cookie-session');
const passport=require('passport');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const authRoutes=require('./routes/auth-routes');
const passportsetup=require('./config/passport-setup');
const profileroutes=require('./routes/profile-routes');
const port=process.env.PORT || 8000;

mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true},(err,db)=>{
    if(err){
        console.log(`Db connection failed`);
    }
    else{
        console.log(`Db connected successfully...`);
    }
});

app.set('view engine','ejs');
app.use(cookiesession({
    maxAge:1000*60*60*24,
    keys:[keys.session.cookiekey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
app.use('/profile',profileroutes);

app.get('/',(req,res)=>{
    console.log(`Home Page...`);
    res.render('home',{ user: req.user });
});
app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
});
