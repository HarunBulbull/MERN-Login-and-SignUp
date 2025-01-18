const express = require("express");
const router = express.Router();

// Routes
const UserRoute = require('./users.js')

// Paths
router.use("/users", UserRoute);

module.exports = router;