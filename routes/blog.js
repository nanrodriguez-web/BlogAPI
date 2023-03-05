const express = require("express");

const auth = require("../auth.js");
const blogController = require("../controller/blogController.js");

const router = express.Router();

// create user blog
router.post("/createBlog", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         content: req.body.content,
      };

      const resultFromController = await blogController.createBlog(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

// retrieve users blog
router.get("/retreiveUserBlogs", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
      };

      const resultFromController = await blogController.getUserBlogs(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

// updating users blog
router.put("/updateBlog/:blogId", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         content: req.body.content,
         blogId: req.params.blogId,
      };

      const resultFromController = await blogController.updateUserBlog(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

// archive / delete users blog
// soft deleting blog
router.delete("/archiveBlog/:blogId", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         blogId: req.params.blogId,
      };

      const resultFromController = await blogController.archiveBlog(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

//adding comment to a blog
router.post("/addComment/:blogId", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         blogId: req.params.blogId,
         comment: req.body.comment,
      };

      const resultFromController = await blogController.addComment(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

//updating comment to a blog
router.put("/updateComment/:blogId", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         blogId: req.params.blogId,
         commentId: req.body.commentId,
         updatedComment: req.body.comment,
      };

      const resultFromController = await blogController.updateComment(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

//deleting comment to a blog
router.delete("/deleteComment/:blogId", auth.verify, async (req, res) => {
   try {
      const data = {
         userData: auth.decode(req.headers.authorization),
         blogId: req.params.blogId,
         commentId: req.body.commentId,
      };

      const resultFromController = await blogController.deleteComment(data);
      res.send(resultFromController);
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
});

module.exports = router;
