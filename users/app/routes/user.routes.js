module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  const verifyToken = require('../middleware/auth')
  // Create a new Tutorial
  router.post("/register", users.create);

  // login
  router.post("/login", users.login);

  // change password
  router.post("/changePassword",verifyToken.verifyToken, users.changePassword);

  // Updating user details
  router.post("/basicDetails", verifyToken.verifyToken, users.basicDetails);

  app.use('/', router);


};
