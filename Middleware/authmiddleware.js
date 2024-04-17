const authenticateuser = (req,res,next) => {
  
    if(req.isAuthenticated()){
        return next();
    }else{
       res.redirect('/signup');
    }
}

module.exports = authenticateuser;
