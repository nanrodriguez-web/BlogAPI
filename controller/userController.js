//Importing Modules
const bcrypt = require("bcrypt");

//Import User Schema
const User = require("../models/User.js");

//Register a User
module.exports.register = async (reqBody) => {
   const { username, password } = reqBody;

   //Check if the user is already registered
   const userExists = await User.findOne({ username: username });

   if (userExists != null) {
      //if the user is already registered
      return false;
   } else {
      //if the user is not registered
      let user = new User({
         username: username,
         password: bcrypt.hashSync(password, 10),
      });

      //saving the user inputs
      return user.save().then((result) => {
         if (result != null) {
            return true;
         } else {
            return false;
         }
      });
   }
};

//Login the user
module.exports.login = async (reqBody) => {};
