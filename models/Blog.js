const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
   user: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   comments: [
      {
         user: {
            type: String,
            required: true,
         },
         commentFromUser: {
            type: String,
            required: true,
         },
      },
   ],
   createdOn: {
      type: Date,
      default: new Date(),
   },
});

module.exports = mongoose.model("Blog", blogSchema);
