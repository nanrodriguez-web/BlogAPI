//importing modules
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

//creating blogSchema
const blogSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   comments: {
      type: [
         {
            userId: {
               type: String,
               required: true,
            },
            user: {
               type: String,
               required: true,
            },
            commentFromUser: {
               type: String,
               required: true,
            },
            commentedOn: {
               type: Date,
               default: new Date(),
            },
         },
      ],
      default: null,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   createdOn: {
      type: String,
      default: `${new Date().getFullYear()} ${
         month[new Date().getMonth()]
      } ${new Date().getDate()} `,
   },
});

//exporting model
module.exports = mongoose.model("Blog", blogSchema);
