const jwt = require("jsonwebtoken");

// Token Creation
const secret = "BlogAPI";
module.exports.createAccessToken = (user) => {
   const data = {
      id: user._id,
      username: user.username,
   };
   return jwt.sign(data, secret, {});
};

// Token Verification
module.exports.verify = (req, res, next) => {
   //token is retrieved from the request header
   let token = req.headers.authorization;
   console.log(token);

   // token received and is not undefinede
   if (typeof token !== "undefined") {
      console.log(token);
      // "Slice" method
      //  Bearer 1f8n34bj3jb234bj2359823bj -> separating Bearer
      token = token.slice(7, token.length);

      // Validate the token using the verify method decrypting the token using the secret code
      return jwt.verify(token, secret, (err, data) => {
         // if JWT is not valid
         if (err) {
            return res.send({ auth: "failed" });
         } else {
            // if JWT is valid
            next();
         }
      });
   } else {
      //Token does not exist
      return res.send({ auth: "failed" });
   }
};

// Token decryption
module.exports.decode = (token) => {
   if (typeof token !== "undefined") {
      token = token.slice(7, token.length);

      return jwt.verify(token, secret, (err, data) => {
         if (err) {
            return null;
         } else {
            return jwt.decode(token, { complete: true }).payload;
         }
      });
   } else {
      return null;
   }
};
