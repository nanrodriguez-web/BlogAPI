//Importing modules
const express = require("express");

//importing controller module
const userController = require("../controller/userController.js");

const router = express.Router();

// register user
router.post("/register", async (req, res) => {
   try {
      const resultFromController = await userController.register(req.body);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});
// login user
router.post("/login", async (req, res) => {
   try {
      const resultFromController = await userController.loginUser(req.body);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

module.exports = router;
