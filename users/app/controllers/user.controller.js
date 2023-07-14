const db = require("../models");
const utilsHandler = require("../handlers/utils.js");
const validationHandler = require("../handlers/validation.js");
const requiredParams = require("../config/requiredParams.json");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");

config = require('config');
const User = db.users;

const BasicDetails = db.addresses;
const jwtPrivateKey = process.env.jwtPrivateKey;
// Register a new User 
exports.create = async (req, res) => {
  try {
    // Validate request
    validationHandler.requiredParams(req.body, requiredParams.register);

    // Check if user already exists
    userData = await User.findOne({ where: { mobile: req.body.mobile.replace(/ /g, "") } });
    if (userData) {
      return res.status(400).send({
        message: "User already exists!"
      });

    }
    const passwordHash = utilsHandler.encryptPassword(req.body.password);
    // Create a user
    const user = {
      email: req.body.email || "",
      mobile: req.body.mobile.replace(/ /g, ""),
      password: passwordHash,
      name: req.body.name || "",
      isVerified: false
    };
    User.create(user)
      .then(data => {
        res.send({
          message: "User registered successfully!",
          data: data,
          // token: token
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    });
  }
};

// Login a User
exports.login = async (req, res) => {
  try {
    // get user from database
    await User.findOne({ where: { mobile: req.body.mobile.replace(/ /g, "") } })
      .then(data => {
        //check if user exists
        if (!data) {
          res.status(400).send({
            message: "User not found!"
          });
          return;
        } else {
          if (!utilsHandler.verifyPassword(req.body.password, data.password)) {
            res.status(400).send({
              message: "Invalid password!"
            });
            return;
          } else {
            //  console.log("*****: ", {id:req.body.id, mobile: req.body.mobile, algorithm: ['HS256'] })
            const token = jwt.sign({ id: data.id, mobile: data.mobile, algorithm: ['HS256'] }, jwtPrivateKey);
            res.send({
              message: "Login successful!",
              data: {
                id: data.id,
                mobile: data.mobile,
                token: token
              }
            });
          }
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }

};

// Chaneg password
exports.changePassword = async (req, res) => {
  try {
    const { mobile, password, confirmPassword } = req.body
    validationHandler.requiredParams(req.body, requiredParams.changePassword);
    if (password != confirmPassword) {
      res.status(400).send({
        message: "Password and Confirm Password not match!"
      });
    }
    const newpassword = utilsHandler.encryptPassword(req.body.password);

    if (newpassword) {
      await User.update({ password: newpassword }, { where: { mobile: mobile } })
        .then(data => {
          //check if user exists
          if (data[0] == false) {
            res.status(400).send({
              message: "User not found check mobile number!"
            });
            return;
          }
          else {
            res.send({
              message: "Password update successful!",
              data: data
            });

          }
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating password!"
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }

};

// Updating user details 
exports.basicDetails = async (req, res) => {
  try {
    // const authtoken = token.next();
    // console.log("authtoken...",authtoken);

    // Validate request
    validationHandler.requiredParams(req.body, requiredParams.basicDetails);
    // Check user exists
    User.findOne({ where: { mobile: req.body.mobile } })
      .then(data => {
        if (!data) {
          res.status(400).send({
            message: "User not exists!"
          });
          return;
        }
        else {
          const basicDetails = {
            email: req.body.email || "",
            alternate_mobile: req.body.alternate_mobile || "",
            line1: req.body.line1 || "",
            line2: req.body.line2 || "",
            state: req.body.state,
            city: req.body.city || "",
            zip: req.body.zip,
            whatsapp_number: req.body.whatsapp_number || "",
            userId: data.id
          };
          BasicDetails.create(basicDetails)
            .then(data => {
              res.send({
                message: "User details update successfully!",
                data: data,
              });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating the user detail!"
              });
            });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users for update detail!."
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    });
  }
};




