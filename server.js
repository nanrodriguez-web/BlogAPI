// Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

//local modules
const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");
const specification = require("./src/specification.js");

const app = express();

const options = {
   definition: specification,
   apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server listening
app.listen(process.env.PORT || 4000, () => {
   console.log(`API is now connected on port: ${process.env.PORT}`);
});
