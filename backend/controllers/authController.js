const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const dotenv = require("dotenv");

dotenv.config();

// Auth0 Config
const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

// Set up JWKS client to fetch Auth0's signing keys
const client = jwksClient({
  jwksUri: `https://dev-64x2c7ktrwnmij7t.us.auth0.com`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: auth0Audience,
      issuer: `https://${auth0Domain}/`,
      algorithms: ["RS256"],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decoded;
      next();
    }
  );
};

// Register User (Handled by Auth0)
exports.registerUser = async (req, res) => {
  res.status(200).json({ message: "Register handled by Auth0" });
};

// Login User (Handled by Auth0)
exports.loginUser = async (req, res) => {
  res.status(200).json({ message: "Login handled by Auth0" });
};

// Get User Info (Protected Route)
exports.getUserInfo = async (req, res) => {
  res.json({
    message: "User info retrieved successfully",
    user: req.user,
  });
};

module.exports = { verifyToken, registerUser, loginUser, getUserInfo };
