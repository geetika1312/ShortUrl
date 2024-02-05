//const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken'); //commonly used for creating and verifying JWTs.
const secret = "geet$";

//The setUser function takes a user object as a parameter.
//It uses jwt.sign to create a JWT with the user's "__id" and "email" properties as the payload.
//The JWT is signed using the secret key, and the resulting token is returned.
function setUser(user) {
  return jwt.sign(
    {
      __id: user.__id,
      email: user.email,
      role: user.role,
    }, 
    secret);
  //sessionIdToUserMap.set(id, user);
}

//function getUser(id) {
//  return sessionIdToUserMap.get(id);
//}


//The getUser function takes a JWT (token) as a parameter.
//If the token is falsy (undefined, null, etc.), it returns null.
//It uses jwt.verify to attempt to verify and decode the JWT using the secret key.
//If the verification is successful, it returns the decoded payload (user information). If an error occurs during verification, it returns null.
function getUser(token) {
  if(!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch(error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};