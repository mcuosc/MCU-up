var express = require('express');
const passport = require("passport");

var router = express.Router();

const AuthMethod = require("../controllers/auth_controller");

const authMethod = new AuthMethod();

router.get("/google",passport.authenticate("google", { scope: ['email'] }));
router.get("/google/callback",passport.authenticate("google", {  scope: ['email'], prompt: 'select_account', failureRedirect: '/auth/login', failureFlash: true}), authMethod.callbackByGoogle);
router.get("/login",authMethod.login);
router.get("/logout",authMethod.logout);
router.get("/profile",authMethod.profile);


module.exports = router;
