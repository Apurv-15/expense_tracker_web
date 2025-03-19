const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const router = express.Router();

// Middleware to check JWT token from Auth0
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'dev-64x2c7ktrwnmij7t.us.auth0.com' // Replace YOUR_AUTH0_DOMAIN
  }),
  audience: "https://dev-64x2c7ktrwnmij7t.us.auth0.com/api/v2/", // Replace with your API Audience from Auth0
  issuer: `dev-64x2c7ktrwnmij7t.us.auth0.com`, // Replace YOUR_AUTH0_DOMAIN
  algorithms: ["RS256"],
});

// Sample route to register user (handled by Auth0)
router.post("/register", (req, res) => {
  res.json({ message: "Register through Auth0's UI or API" });
});

// Login handled by Auth0
router.post("/login", (req, res) => {
  res.json({ message: "Login via Auth0's Universal Login or API" });
});

// Protected route using Auth0 JWT authentication
router.get("/getUser", checkJwt, (req, res) => {
  res.json({
    message: "User Info Retrieved",
    user: req.user, // Auth0 provides the user info in JWT payload
  });
});

module.exports = router;
