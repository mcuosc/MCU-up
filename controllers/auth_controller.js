const getComment = require("../models/getComment_model");
module.exports = class Auth {

  callbackByGoogle(req,res){
    //res.redirect("back");
    res.redirect('/auth/profile?redirect=true');
  }

  login(req,res){
    res.render("login",{err: req.flash('error')[0]});
  }
  logout(req,res){
    req.logout();
    res.redirect("/");
  }

  profile(req,res){
    if (req.isAuthenticated()) {
      getComment({$regex:".*"}, {$regex:".*"}, req.session.passport.user).then(result=>{
        res.render("profile", {me:req.session.passport.user, data:result.data});
      }, (err) => {
        console.log(err);
      })

    } else {
      res.redirect("/auth/login");
    }
  }

  checkAccount(req,res,next){
    res.redirect("/auth/login",{err: req.message});
  }

};
