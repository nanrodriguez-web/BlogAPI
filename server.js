// Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//local modules
const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");

const app = express();

//This is to connect the server to the database
mongoose.connect(
   "mongodb+srv://blogNan:blogNan0697@cluster0.ecmpbza.mongodb.net/?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

// Setting notifications if the database is connected
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("open", () => console.log("We are now connected to the database"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/blog", blogRoutes);

// Server listening
app.listen(process.env.PORT || 4000, () => {
   console.log(`API is now connected on port: ${process.env.PORT}`);
});
