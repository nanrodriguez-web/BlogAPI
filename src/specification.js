//Blog openAPI

const specifications = {
   openapi: "3.0.0",
   info: {
      title: "BlogAPI",
      description: "Creating an API for Blog",
      version: "1.0.0",
   },
   servers: [
      {
         url: "http://localhost:4000",
      },
   ],
   paths: {
      "/users/register": {
         description: "User Registration",
         post: {
            description: "Register user",
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/user",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Success Response",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Error on Registration",
               },
            },
         },
      },
      "/users/login": {
         description: "User Registration",
         post: {
            description: "Register user",
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           username: {
                              type: "string",
                              example: "userName101",
                           },
                           password: {
                              type: "string",
                              example: "user@12345",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Success Response",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              access: {
                                 type: "string",
                                 example:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDU1MjdjZjVmNjA5ZDBiZjI3ZmU3MyIsInVzZXJuYW1lIjoidXNlckZyb21PcGVuQVBJIiwiaWF0IjoxNjc4MDcyNjAzfQ.xxE-8XndJxrQQkBh09bwB2Ow8DG7LapoqtlbdYFasEA",
                              },
                           },
                        },
                     },
                  },
               },
               500: {
                  description: "Error on Login",
               },
            },
         },
      },
      "/blog/createBlog": {
         description: "User will create blog",
         post: {
            description: "create a blog",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/blog",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Successfully created",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Internal Server Error",
               },
            },
         },
      },
      "/blog/retreiveUserBlogs": {
         description: "Retrieved logged user's Posts",
         get: {
            description: "Retrieve posts",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            responses: {
               200: {
                  description: "Successfully retrieved user's Post",
               },
            },
         },
      },
      "/blog/retreiveBlogs": {
         description: "Retrieve all blogs of all registered users",
         get: {
            description: "Retrieve all blogs",
            responses: {
               200: {
                  description: "Successfully retrieve all users blog",
                  content: {
                     "application/json": {
                        schema: {
                           type: "array",
                           items: {
                              properties: {
                                 _id: {
                                    type: "string",
                                 },
                                 userID: {
                                    type: "string",
                                 },
                                 username: {
                                    type: "string",
                                 },
                                 content: {
                                    type: "string",
                                 },
                                 comments: {
                                    type: "array",
                                    items: {
                                       properties: {
                                          userId: {
                                             type: "string",
                                          },
                                          user: {
                                             type: "string",
                                          },
                                          commentFromUser: {
                                             type: "string",
                                          },
                                          createdOn: {
                                             type: "string",
                                          },
                                          _id: {
                                             type: "string",
                                          },
                                       },
                                    },
                                 },
                                 isActive: {
                                    type: "boolean",
                                 },
                                 createdOn: {
                                    type: "string",
                                 },
                              },
                           },
                        },
                     },
                  },
               },
            },
         },
      },
      "/blog/updateBlog/{blogId}": {
         description: "Updating an specific blog by the user",
         put: {
            description: "Updating blog using blogId",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "blogId",
                  required: true,
                  schema: {
                     type: "string",
                     example: "64041f5585d8b94924b8c209",
                  },
               },
            ],
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           content: {
                              type: "string",
                              example: "My updated Blog post",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Successfully updated",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Internal server error",
               },
            },
         },
      },
      "/blog/archiveBlog/{blogId}": {
         description: "Soft Delete of Blog post",
         delete: {
            description: "Archiving blog post instead of delete",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "blogId",
                  required: true,
                  schema: {
                     type: "string",
                     example: "64041f5585d8b94924b8c209",
                  },
               },
            ],
            responses: {
               200: {
                  description: "Successfullty deleted item or not",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "internal server error",
               },
            },
         },
      },
      "/blog/addComment/{blogId}": {
         description: "adding comment on specific blog post",
         post: {
            description: "User should be login an provide speficic postId",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "blogId",
                  required: true,
                  schema: {
                     type: "string",
                     example: "64041f5585d8b94924b8c209",
                  },
               },
            ],
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/comment",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Successfully add comment",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Internal Server Error",
               },
            },
         },
      },
      "/blog/updateComment/{blogId}": {
         description: "updating blog comment",
         put: {
            description:
               "user will update his/her comment using commentId and blogId",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "blogId",
                  required: true,
                  schema: {
                     type: "string",
                     example: "64041f5585d8b94924b8c209",
                  },
               },
            ],
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           commentId: {
                              type: "string",
                              example: "64041f5585d8b94924b8c209",
                           },
                           comment: {
                              type: "string",
                              example: "This is my updated comment",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Successfully add comment",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Internal Server Error",
               },
            },
         },
      },
      "/blog/deleteComment/{blogId}": {
         description: "Deleting specific comment",
         put: {
            description: "Delete specific comment using commentId and blogId",
            security: [
               {
                  bearerAuth: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "blogId",
                  required: true,
                  schema: {
                     type: "string",
                     example: "64041f5585d8b94924b8c209",
                  },
               },
            ],
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           commentId: {
                              type: "string",
                              example: "64041f5585d8b94924b8c209",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Successfully add comment",
                  content: {
                     "application/json": {
                        schema: {
                           type: "boolean",
                           example: true,
                        },
                     },
                  },
               },
               500: {
                  description: "Internal Server Error",
               },
            },
         },
      },
   },
   components: {
      schemas: {
         user: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  example: "username101",
               },
               password: {
                  type: "string",
                  example: "username@12345",
               },
            },
         },
         blog: {
            type: "object",
            properties: {
               content: {
                  type: "string",
                  example: "My new Blog Post",
               },
            },
         },
         comment: {
            type: "object",
            properties: {
               comment: {
                  type: "string",
                  example: "This is my comment on a blog post",
               },
            },
         },
      },
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
   },
};

module.exports = specifications;
