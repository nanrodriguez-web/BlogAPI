const mongoose = require("mongoose");

const month = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, "Username is required"],
   },
   password: {
      type: String,
      required: [true, "Password is required"],
   },
   createdOn: {
      type: String,
      default: `${new Date().getFullYear()} ${
         month[new Date().getMonth()]
      } ${new Date().getDate()} `,
   },
});

module.exports = mongoose.model("User", userSchema);
