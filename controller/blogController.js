//Import Blog Schema
const Blog = require("../models/Blog.js");

//createBlog a User
module.exports.createBlog = async (reqBody) => {
   //destructuring request body
   const { userData, content } = reqBody;

   //verify if the user is login
   if (userData !== null) {
      //creating a new blog
      let blog = new Blog({
         userId: userData.id,
         username: userData.username,
         content: content,
      });

      //saving the blog
      const result = await blog.save();

      //if success
      if (result != null) {
         return true;
      }
      // if not success
      else {
         return false;
      }
   } else {
      return false;
   }
};

//retrieve userBlogs
module.exports.getUserBlogs = async (reqBody) => {
   //destructuring request body
   const { userData } = reqBody;

   //finding blog by users Id
   const blog = await Blog.find({ userId: userData.id, isActive: true });

   if (blog.length != 0) {
      return blog;
   } else {
      return false;
   }
};

//updating userBlogs
module.exports.updateUserBlog = async (reqBody) => {
   const { userData, content, blogId } = reqBody;

   const blog = await Blog.findById(blogId);

   if (blog != null) {
      if (blog.userId === userData.id) {
         blog.content = content;
         const result = await blog.save();

         if (result != null) {
            return true;
         } else {
            return false;
         }
      } else {
         return false;
      }
   } else {
      return false;
   }
};

//archiving/Deleting userBlogs
module.exports.archiveBlog = async (reqBody) => {
   const { userData, blogId } = reqBody;

   const blog = await Blog.findById(blogId);

   if (blog != null) {
      if (blog.userId === userData.id) {
         blog.isActive = false;
         const result = await blog.save();

         if (result != null) {
            return true;
         } else {
            return false;
         }
      } else {
         return false;
      }
   } else {
      return false;
   }
};

//adding Comment to a blog

module.exports.addComment = async (reqBody) => {
   const { userData, blogId } = reqBody;
};
