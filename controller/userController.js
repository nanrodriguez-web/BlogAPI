//Importing Modules
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

//Import User Schema
const User = require("../models/User.js");

//Register a User
module.exports.register = async (reqBody) => {
   //destructuring request body
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

// Login registered users
module.exports.loginUser = async (reqBody) => {
   //destructuring request body
   const { username, password } = reqBody;

   //Check if the user have an account
   const user = await User.findOne({ username: username });

   if (user == null) {
      // if the user is not registered
      return false;
   } else {
      //if the user has an account/registered

      // checking if the password is correct
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
         return { access: auth.createAccessToken(user) };
      } else {
         return false;
      }
   }
};
