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

   //finding blog by users Id  and isActive
   const blog = await Blog.find({ userId: userData.id, isActive: true });

   if (blog.length != 0) {
      return blog;
   } else {
      return false;
   }
};

//updating userBlogs
module.exports.updateUserBlog = async (reqBody) => {
   //destructuring request body
   const { userData, content, blogId } = reqBody;

   // finding blog via id
   const blog = await Blog.findById(blogId);

   if (blog != null) {
      // checking if the log user owns the post
      if (blog.userId === userData.id) {
         blog.content = content;
         const result = await blog.save();

         if (result != null) {
            return true;
         } else {
            return false;
         }
      }
      //if not the owner
      else {
         return false;
      }
   } else {
      return false;
   }
};

//archiving/Deleting userBlogs
module.exports.archiveBlog = async (reqBody) => {
   //destructuring request body
   const { userData, blogId } = reqBody;

   // finding blog via id
   const blog = await Blog.findById(blogId);

   //checking if the blog exists
   if (blog != null) {
      // checking if the log user owns the post
      if (blog.userId === userData.id) {
         //check if the post is not yet archived
         if (blog.isActive) {
            //setting the post isActive to false
            blog.isActive = false;

            //saving the blog changes
            const result = await blog.save();

            // if success
            if (result != null) {
               return true;
            } else {
               return false;
            }
         }
         //if already archived
         else {
            return false;
         }
      } else {
         return false;
      }
   }
   //if blog not exists
   else {
      return false;
   }
};

//adding Comment to a blog
module.exports.addComment = async (reqBody) => {
   //desctructing the request body
   const { userData, blogId, comment } = reqBody;

   const blog = await Blog.findById(blogId);

   console.log(blog);

   if (blog != null) {
      let blogComment = {
         userId: userData.id,
         user: userData.username,
         commentFromUser: comment,
      };

      blog.comments.push(blogComment);

      const result = await blog.save();

      if (result != null) {
         return true;
      } else {
         return false;
      }
   } else {
      return false;
   }
};

//updating Comment to a blog
module.exports.updateComment = async (reqBody) => {
   //destruction of request body
   const { userData, blogId, updatedComment, commentId } = reqBody;

   //finding the blog
   const blog = await Blog.findById(blogId);

   //if exist
   if (blog != null) {
      //finding the comment index on the blog comments
      const commentIndex = blog.comments.findIndex((comment) => {
         return comment.id === commentId;
      });

      //check if the comment exists
      if (commentIndex != -1) {
         const blogComment = blog.comments[commentIndex];

         //verifying if the user who will update the comment is the author of the comment
         if (blogComment.userId === userData.id) {
            //updating the content of comment
            blogComment.commentFromUser = updatedComment;

            //saving the comment
            const result = await blog.save();

            //if success
            if (result != null) {
               return true;
            } else {
               return false;
            }
         }
         // if the user is not the author of the comment
         else {
            return false;
         }
      } else {
         return false;
      }
   }
   //if the blog does not exist
   else {
      return false;
   }
};

//deleting a comment
module.exports.deleteComment = async (reqBody) => {
   //destruction of request body
   const { userData, blogId, commentId } = reqBody;

   //finding the blog
   const blog = await Blog.findById(blogId);

   //if exist
   if (blog != null) {
      //finding the comment index on the blog comments
      const commentIndex = blog.comments.findIndex((comment) => {
         return comment.id === commentId;
      });

      //checking if the comment exists
      if (commentIndex != -1) {
         const blogComment = blog.comments[commentIndex];

         //verifying if the user who will update the comment is the author of the comment
         if (blogComment.userId === userData.id) {
            //deleting the of comment
            blog.comments.splice(commentIndex, 1);

            //saving the comment
            const result = await blog.save();

            // if success
            if (result != null) {
               return true;
            } else {
               return false;
            }
         }
         // if the user is not the author of the comment
         else {
            return false;
         }
      } else {
         return false;
      }
   }
   //if the blog does not exist
   else {
      return false;
   }
};
