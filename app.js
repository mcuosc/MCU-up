require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const mongoose = require("mongoose");
const helmet = require('helmet');

/* Authentication */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
/*-- whitelist module --*/
const whitelist = require("./data/whitelist.json");
function inWhitelist(name) {
  for(let item of whitelist){
    if(name.search(item)!=-1){
      return true;
    }
  }
  return false;
}

/* Routers */
const courseRouter = require("./routes/course");
const authRouter = require("./routes/auth");
const exampleRouter = require("./routes/example");

const port = process.env.PORT || 3000;

const app = express();
app.enable("trust proxy"); // ensure the proxy is enabled
app.use(helmet({
  contentSecurityPolicy: false/*{
      reportOnly: true
  }*/
}));
/*Auth Initializaion */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_LINK })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const User = require("./models/user_model");
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(profile);

      if ( (profile._json.hd === "me.mcu.edu.tw") && (!(process.env.WHITELIST_MODE === 'true') || inWhitelist(profile._json.email))){
        User.findOrCreate({ username: profile.emails[0].value,googleId: profile.id, profile:profile._json}, (err, user)=>{
          return cb(err, user);
        });
      }
      else{
         return cb(null, false ,{message: "Invalid domain name."});
      }

    }
  )
);

/* Database Connection Initializaion*/
mongoose.connect(process.env.DATABASE_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public"));

app.set("view engine", "pug"); // switch to pug
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  // res.locals.google_analytics = process.env?.GA_MEASUREMENT_ID
  next();
})

app.get("/", (req, res) => {
  res.render("home",  {isAuthenticated:req.isAuthenticated()});
});
app.use('/test',exampleRouter);
app.use('/auth',authRouter);
app.use('/courses',courseRouter);

app.use(function(req, res, next) {
  res.status(404).render('error');
});

app.listen(port, () => {
  console.log("using database: " + process.env.DATABASE_LINK);
  console.log("server starting on port: " + port);
});
