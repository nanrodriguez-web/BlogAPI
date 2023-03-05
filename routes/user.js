const express = require("express");

const auth = require("../auth.js");
const userControllers = require("../controller/userController.js");

const router = express.Router();

// register user
router.post("/register", async (req, res) => {
   try {
      const resultFromController = await userControllers.register(req.body);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

module.exports = router;
