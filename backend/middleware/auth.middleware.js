const jsw = require("jsonwebtoken");
const User = require("../models/user.model");

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("req.headers.authorization: ", req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token || token == "null") {
    return res
      .status(401)
      .json({ success: false, msg: "Not authorize to access this routes" });
  }

  try {
    // Verify token
    const decoded = jsw.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({ success: false, error: error });
  }
};
