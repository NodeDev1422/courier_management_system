var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Parent = require('../app/models/Parent');
const UserSession = require('../app/models/UserSession');
const { NOW } = require('sequelize');
const Student = require('../app/models/Student');

passport.use('otp-login',new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'otp',
}, async(user_id,otp,done)=>{

try{
  let sessionCheck = await UserSession.findOne({
    where: { 'login_otp': otp,'user_id':user_id }
  });
  if(!sessionCheck)
  {
    return done({ message: 'Invalid OTP' }, false);
  }

  if(sessionCheck.session_start)
  {
    return done( { message: 'Invalid Login!' }, false);
  }

  let mode = sessionCheck.role;
  let userId = sessionCheck.user_id;
  let sessionId = sessionCheck.id;
  if(mode == 1)
  {
      Parent.findOne({where: {'id': userId}}).then(async(user)=>{
    // if(!user || !user.validPassword(password)){
    //   return done(null, false, {errors: {'username or password': 'is invalid'}});
    // }
    // Check if the OTP is valid
    await UserSession.update({
      login_user_name: user.first_name,
      session_start: new Date(),
      session_end: new Date(),
      login_date: new Date()
    },{ where: { id: sessionId },
    returning: false });
    user.role = mode;
    return done(null, user);
  }).catch(done);
}

if(mode == 2){
  Student.findOne({where: {'id': userId}}).then(async(user)=>{
    // if(!user || !user.validPassword(password)){
    //   return done(null, false, {errors: {'username or password': 'is invalid'}});
    // }
    // Check if the OTP is valid
    await UserSession.update({
      login_user_name: user.first_name,
      session_start: new Date(),
      session_end: new Date(),
      login_date: new Date()
    },{ where: { id: sessionId },
    returning: false });
    user.role = mode;
    return done(null, user);
  }).catch(done);
}

}catch(e){
  console.log(done);
  return done({ message: 'Some thing went wrong!' }, false);
}
  
}));

