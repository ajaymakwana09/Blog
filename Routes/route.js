const express = require('express');
const routes = express();
const controller = require('../Controlls/Maincontroller');
const passport = require('../Middleware/auth');
const authenticateuser = require('../Middleware/authmiddleware.js')

routes.get('/', authenticateuser, controller.defaultController);

routes.get('/signin', controller.signincontroller);

routes.get('/signup', controller.signupcontrooler);

routes.post('/adminreg', controller.adminregcontroller);

routes.post('/loginadmin', passport.authenticate('local', { failureRedirect: '/signin', successRedirect: '/' }));

routes.get('/logoutadmin', controller.logoutadmincontroller);

routes.get('/form', controller.formcontroller);

routes.post('/useradd', controller.useraddcontroller);
routes.get('/deletecontroller/:id',controller.deletecontroller);

routes.get('/editblogcontroller/:id',controller.editblogcontroller);

routes.get('/table', controller.tablecontroller);

routes.get('/myprofile', controller.myprofilecontroller);

routes.post('/edit', controller.editcontroller);

routes.get('/editprofile', controller.editprofilecontroller);

routes.post('/changepassword', controller.changepasswordcontroller);

routes.get('/changepassword', controller.changepassword);

routes.get('/forgetpass', controller.forgetpass);

routes.post('/finduser', controller.finduser);

routes.get('/otpvalidation', controller.otpvalidation);

routes.post('/submitotp', controller.submitotp);

routes.get('/resetpassword', controller.resetpassword);

routes.post('/newpass', controller.newpass);




module.exports = routes;